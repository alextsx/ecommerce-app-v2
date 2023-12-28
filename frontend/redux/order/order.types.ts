import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';
import { AddressType } from '../user-details/user-details.types';

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

export type OrderItemType = {
  quantity: number;
  unitPrice: string;
  total: string;
  product: {
    name: string;
    productImages: {
      url: string;
    }[];
  };
};

export type DetailedOrderType = {
  createdAt: string;
  fulfillmentStatus: string;
  paymentStatus: string;
  total: string;
  paymentMethod: string;
  orderItems: OrderItemType[];
};

export type DetailedAdminOrderType = DetailedOrderType & {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    billingAddress: AddressType;
    shippingAddress: AddressType;
  };
};

export type OrderHistoryResponseType = DetailedOrderType[];
