import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CartItemDto } from 'src/order/dtos/create-order.dto';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';

type ProductWithImage = Product & {
  productImages: {
    url: string;
  }[];
};

export type LineItemType = Stripe.Checkout.SessionCreateParams.LineItem;

@Injectable()
export class LineItemsService {
  constructor(private readonly stripeService: StripeService) {}

  public createLineItems(products: ProductWithImage[], cartItems: CartItemDto[]): LineItemType[] {
    return products.map((product) => {
      const cartItem = cartItems.find((item) => item.slug === product.slug);

      const productPrice = product.discountedPrice ?? product.price;
      const productPriceInteger = Math.ceil(productPrice);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            ...(product.description && { description: product.description }),
            images: product.productImages.map((image) => image.url)
          },
          unit_amount: productPriceInteger * 100
        },
        quantity: cartItem.quantity
      };
    });
  }
}
