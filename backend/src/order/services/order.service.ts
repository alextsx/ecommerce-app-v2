import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dtos/create-address.dto';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/product/services/products.service';
import { PaymentIntentService } from 'src/stripe/services/payment-intent.service';
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
    private readonly paymentIntentService: PaymentIntentService,
    private readonly prismaService: PrismaService,
    private readonly productsService: ProductsService
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
    const products = await this.productsService.getProductsForSlugs(productSlugs);

    // Validate cart items
    this.validateCartItems({ cartItems, products });

    // Calculate total
    const total = cartItems.reduce((acc, cartItem) => {
      const product = products.find((product) => product.slug === cartItem.slug);
      return acc + product.price * cartItem.quantity;
    }, 0);

    // Create order
    const order = await this.createOrder({
      customerId: customer.id,
      total
    });

    // Create order items
    await Promise.all(
      cartItems.map((cartItem) => {
        const product = products.find((product) => product.slug === cartItem.slug);
        return this.orderItemService.createOrderItem({
          orderId: order.id,
          productId: product.id,
          quantity: cartItem.quantity,
          unitPrice: product.price,
          total: product.price * cartItem.quantity
        });
      })
    );
  }

  private async createOrder({ customerId, total }: { customerId: string; total: number }) {
    return this.prismaService.order.create({
      data: {
        customer: {
          connect: {
            id: customerId
          }
        },
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
