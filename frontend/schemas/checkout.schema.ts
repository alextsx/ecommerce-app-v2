import { boolean, object, string } from 'yup';
import { errorLabels } from '@/constants/errorLabels';

const { checkout: checkoutErrorLabels } = errorLabels;

const { address: addressErrorLabels, customer: customerErrorLabels } = checkoutErrorLabels;

export const checkoutSchema = object().shape({
  billingAddress: object().shape({
    'billing-same-as-shipping': boolean().required(),
    'billing-line1': string()
      .when('billing-same-as-shipping', {
        is: false,
        then: (schema) => schema.required(addressErrorLabels.line1.required)
      })
      .max(255, addressErrorLabels.line1.max),
    'billing-line2': string().max(255, addressErrorLabels.line2.max),
    'billing-city': string()
      .when('billing-same-as-shipping', {
        is: false,
        then: (schema) => schema.required(addressErrorLabels.city.required)
      })
      .max(255, addressErrorLabels.city.max),
    'billing-state': string()
      .when('billing-same-as-shipping', {
        is: false,
        then: (schema) => schema.required(addressErrorLabels.state.required)
      })
      .max(255, addressErrorLabels.state.max),
    'billing-country': string()
      .when('billing-same-as-shipping', {
        is: false,
        then: (schema) => schema.required(addressErrorLabels.country.required)
      })
      .max(255, addressErrorLabels.country.max),
    'billing-zipcode': string()
      .when('billing-same-as-shipping', {
        is: false,
        then: (schema) => schema.required(addressErrorLabels.zipcode.required)
      })
      .max(255, addressErrorLabels.zipcode.max)
  }),
  shippingAddress: object().shape({
    'shipping-line1': string()
      .required(addressErrorLabels.line1.required)
      .max(255, addressErrorLabels.line1.max),
    'shipping-line2': string().max(255, addressErrorLabels.line2.max),
    'shipping-city': string()
      .required(addressErrorLabels.city.required)
      .max(255, addressErrorLabels.city.max),
    'shipping-state': string()
      .required(addressErrorLabels.state.required)
      .max(255, addressErrorLabels.state.max),
    'shipping-country': string()
      .required(addressErrorLabels.country.required)
      .max(255, addressErrorLabels.country.max),
    'shipping-zipcode': string()
      .required(addressErrorLabels.zipcode.required)
      .max(255, addressErrorLabels.zipcode.max)
  }),
  customer: object().shape({
    firstName: string()
      .required(customerErrorLabels.firstName.required)
      .max(255, customerErrorLabels.firstName.max),
    lastName: string()
      .required(customerErrorLabels.lastName.required)
      .max(255, customerErrorLabels.lastName.max),
    email: string()
      .required(customerErrorLabels.email.required)
      .email(customerErrorLabels.email.email),
    phone: string()
      .required(customerErrorLabels.phone.required)
      .max(255, customerErrorLabels.phone.max)
  }),
  paymentMethod: string()
    .required(checkoutErrorLabels.paymentMethod.required)
    .oneOf(['sripe', 'cod'], checkoutErrorLabels.paymentMethod.oneOf)
});
