import { Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { CreateAddressDto } from 'src/address/dtos/create-address.dto';
import { CustomerService } from 'src/customer/customer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/product/services/products.service';
import { PaymentIntentService } from 'src/stripe/services/payment-intent.service';
import { CheckoutDetailsDto, CreateOrderDto } from '../dtos/create-order.dto';
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
      firstName: checkoutDetails['first-name'],
      lastName: checkoutDetails['last-name'],
      phone: checkoutDetails.phone,
      shippingAddressId: shippingAddress.id,
      billingAddressId: billingAddress.id,
      ...(userId && { userId })
    });

    const productIds = cartItems.map((item) => item.slug);
    const products = await this.productsService.getProductsForSlugs(productIds);

    // Calculate total
    const total = cartItems.reduce((acc, cartItem) => {
      const product = products.find((product) => product.id === cartItem.slug);
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
        const product = products.find((product) => product.id === cartItem.slug);
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
}
