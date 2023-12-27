//API

import { UpdateProfileFormType } from '@/app/profile/page';

/*
    "line1": "123 Billing St",
        "line2": "Apt 4B",
        "state": "Billing State",
        "city": "Billing City",
        "zipcode": "12345",
        "country": "Billing Country"
*/
type AddressType = {
  line1: string;
  line2: string;
  state: string;
  city: string;
  zipcode: string;
  country: string;
};

export type UserDetailsResponse = {
  firstName: string;
  lastName: string;
  phone: string | null;
  shippingAddress: AddressType | null;
  billingAddress: AddressType | null;
  'billing-same-as-shipping': boolean;
};

//Slice
export type UserDetailsState = UserDetailsResponse;

export type SetUserDetailsPayload = UserDetailsResponse;

export type UpdateUserDetailsRequestBody = UpdateProfileFormType;
