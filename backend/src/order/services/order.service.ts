import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from '@prisma/client';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dtos/create-address.dto';
import { Config } from 'src/config';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/services/product.service';
import { ProductsService } from 'src/product/services/products.service';
import { CheckoutSessionService } from 'src/stripe/services/checkout-session.service';
import { LineItemsService, ProductWithImage } from 'src/stripe/services/line-items.service';
import { CartItemDto, CheckoutDetailsDto, CreateOrderDto } from '../dtos/create-order.dto';
import { InsufficientQuantityError } from '../errors/insufficient-quantity.error';
import { InvalidCartItemsError } from '../errors/invalid-cartitems.error';
import { ProductNotFoundError } from '../errors/product-notfound.error';
import { OrderItemService } from './order-item.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly addressService: AddressService,
    private readonly customerService: CustomerService,
    private readonly orderItemService: OrderItemService,
    private readonly prismaService: PrismaService,
    private readonly productsService: ProductsService,
    private readonly productService: ProductService,
    private readonly checkoutSessionService: CheckoutSessionService,
    private readonly lineItemsService: LineItemsService,
    private readonly configService: ConfigService<Config>
  ) {}

  public async processOrder({
    userId,
    createOrderDto
  }: {
    userId?: string;
    createOrderDto: CreateOrderDto;
  }) {
    const { checkoutDetails, cartItems } = createOrderDto;

    const shippingAddressData: CreateAddressDto = this.extractAddressDetails({
      checkoutDetails,
      prefix: 'shipping'
    });

    // Create shipping address
    const shippingAddress = await this.addressService.createAddress(shippingAddressData);

    // Create billing address
    let billingAddress = shippingAddress;

    if (!checkoutDetails['billing-same-as-shipping']) {
      const billingAddressData: CreateAddressDto = this.extractAddressDetails({
        checkoutDetails,
        prefix: 'billing'
      });
      billingAddress = await this.addressService.createAddress(billingAddressData);
    }

    // Create customer
    const customer = await this.customerService.createCustomer({
      email: checkoutDetails.email,
      firstName: checkoutDetails.firstName,
      lastName: checkoutDetails.lastName,
      phone: checkoutDetails.phone,
      shippingAddressId: shippingAddress.id,
      billingAddressId: billingAddress.id,
      ...(userId && { userId })
    });

    const productSlugs = cartItems.map((item) => item.slug);
    const products = await this.productsService.getProductsWithImagesForSlugs(productSlugs);

    // Validate cart items
    this.validateCartItems({ cartItems, products });

    // Calculate total
    const total = cartItems.reduce((acc, cartItem) => {
      const product = products.find((product) => product.slug === cartItem.slug);
      const price = product.discountedPrice ?? product.price;
      return acc + price * cartItem.quantity;
    }, 0);

    // Create order
    const order = await this.createOrder({
      customerId: customer.id,
      total,
      paymentMethod: checkoutDetails.paymentMethod
    });

    // Create order items
    await Promise.all(
      cartItems.map((cartItem) => {
        const product = products.find((product) => product.slug === cartItem.slug);
        const price = product.discountedPrice ?? product.price;
        return this.orderItemService.createOrderItem({
          orderId: order.id,
          productId: product.id,
          quantity: cartItem.quantity,
          unitPrice: price,
          total: price * cartItem.quantity
        });
      })
    );

    await Promise.all(
      cartItems.map((cartItem) => {
        const product = products.find((product) => product.slug === cartItem.slug);
        return this.productService.decreaseInventory({
          productId: product.id,
          quantity: cartItem.quantity
        });
      })
    );

    switch (checkoutDetails.paymentMethod) {
      case 'stripe':
        return this.handleStripePayment({ orderId: order.id, products, cartItems });
      case 'cod':
        return this.handleCodPayment();
      default:
        throw new Error('Invalid payment method');
    }
  }

  private handleCodPayment() {
    return {
      redirect_url: this.configService.get('success_url')
    };
  }

  private async handleStripePayment({
    products,
    cartItems,
    orderId
  }: {
    products: ProductWithImage[];
    cartItems: CartItemDto[];
    orderId: string;
  }) {
    //Create line items
    const lineItems = this.lineItemsService.createLineItems(products, cartItems);

    //Create checkout session
    const checkoutSession = await this.checkoutSessionService.createCheckoutSession({
      line_items: lineItems,
      orderId: orderId
    });

    return {
      checkoutSessionId: checkoutSession.id
    };
  }

  private async createOrder({
    customerId,
    total,
    paymentMethod
  }: {
    customerId: string;
    total: number;
    paymentMethod: 'stripe' | 'cod';
  }) {
    return this.prismaService.order.create({
      data: {
        customer: {
          connect: {
            id: customerId
          }
        },
        paymentMethod,
        total
      }
    });
  }

  private extractAddressDetails({
    checkoutDetails,
    prefix
  }: {
    checkoutDetails: CheckoutDetailsDto;
    prefix: string;
  }): CreateAddressDto {
    return {
      city: checkoutDetails[`${prefix}-city`],
      country: checkoutDetails[`${prefix}-country`],
      line1: checkoutDetails[`${prefix}-line1`],
      line2: checkoutDetails[`${prefix}-line2`],
      state: checkoutDetails[`${prefix}-state`],
      zipcode: checkoutDetails[`${prefix}-zipcode`]
    };
  }

  private validateCartItems({
    cartItems,
    products
  }: {
    cartItems: CartItemDto[];
    products: Product[];
  }) {
    if (cartItems.length === 0) {
      throw new InvalidCartItemsError();
    }
    if (cartItems.length !== products.length) {
      throw new InvalidCartItemsError();
    }

    //we should go through each cart item and check if quantity is less or equal to
    //the inventory (stock) of the product in db
    cartItems.forEach((cartItem) => {
      const product = products.find((product) => product.slug === cartItem.slug);
      if (!product) {
        throw new ProductNotFoundError(cartItem.slug);
      }
      if (product.inventory < cartItem.quantity) {
        throw new InsufficientQuantityError(cartItem.slug);
      }
    });
  }
}
