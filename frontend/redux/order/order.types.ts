import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';

export type CreateOrderRequestType = {
  checkoutDetails: CheckoutFormType;
  cartItems: {
    slug: string;
    quantity: number;
  }[];
};

export type CreateOrderResponseType =
  | {
      checkoutSessionId: string;
    }
  | {
      redirect_url: string;
    };
