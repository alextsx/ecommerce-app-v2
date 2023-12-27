'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { BillingAddressForm } from '@/components/form/BillingAddressForm';
import { CustomerDetailsForm } from '@/components/form/CustomerDetailsForm';
import { PaymentMethodForm } from '@/components/form/PaymentMethodForm';
import { ShippingAddressForm } from '@/components/form/ShippingAddressForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import getStripe from '@/lib/get-stripejs';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { selectAccessToken } from '@/redux/auth/auth.slice';
import { selectCart, selectCartTotal } from '@/redux/cart/cart.slice';
import {
  useCreateGuestOrderMutation,
  useCreateLoggedInOrderMutation
} from '@/redux/order/order.api.slice';
import { CreateOrderResponseType } from '@/redux/order/order.types';
import { checkoutSchema } from '@/schemas/checkout.schema';

export type CheckoutFormType = {
  'billing-same-as-shipping': boolean;
  'billing-line1': string;
  'billing-line2': string;
  'billing-city': string;
  'billing-state': string;
  'billing-country': string;
  'billing-zipcode': string;
  'shipping-line1': string;
  'shipping-line2': string;
  'shipping-city': string;
  'shipping-state': string;
  'shipping-country': string;
  'shipping-zipcode': string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: 'stripe' | 'cod';
};

const initialValues: CheckoutFormType = {
  'billing-same-as-shipping': false,
  'billing-line1': '',
  'billing-line2': '',
  'billing-city': '',
  'billing-state': '',
  'billing-country': '',
  'billing-zipcode': '',
  'shipping-line1': '',
  'shipping-line2': '',
  'shipping-city': '',
  'shipping-state': '',
  'shipping-country': '',
  'shipping-zipcode': '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  paymentMethod: 'cod'
};

const CheckoutPage = () => {
  const router = useRouter();

  const totalPrice = useSelector(selectCartTotal);
  const cart = useSelector(selectCart);
  const isLoggedIn = useSelector(selectAccessToken);

  useEffect(() => {
    if (!cart.length) {
      router.push('/cart');
    }
  }, [cart.length, router]);

  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  //mutations
  const [placeOrderGuest, { isLoading: isGuestLoading }] = useCreateGuestOrderMutation();
  const [placeOrderUser, { isLoading: isUserLoading }] = useCreateLoggedInOrderMutation();

  const onSubmit = async (values: any) => {
    hide();
    try {
      const mutationFn = isLoggedIn ? placeOrderUser : placeOrderGuest;
      const requestBody = {
        checkoutDetails: values,
        cartItems: cart.map((item) => ({
          slug: item.slug,
          quantity: item.quantity
        }))
      };

      const response: CreateOrderResponseType = await mutationFn(requestBody).unwrap();

      //cod
      if ('redirect_url' in response) {
        toggleToast({
          title: 'Success',
          description: 'Order successfully placed!',
          variant: 'constructive'
        });
        router.push(response.redirect_url);
        return;
      }

      //stripe
      const stripe = await getStripe();
      await stripe!.redirectToCheckout({
        sessionId: response.checkoutSessionId
      });

      toggleToast({
        title: 'Order successfully placed',
        description: 'You will be redirected to the payment page.',
        variant: 'constructive'
      });

      return;
    } catch (err) {
      const message = parseErrorResponse(err);
      show({
        message,
        title: 'Error',
        variant: 'destructive'
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: checkoutSchema,
    validateOnBlur: true,
    validateOnChange: true
  });

  const { values, touched, errors, handleSubmit } = formik;

  const isBtnDisabled = isUserLoading || isGuestLoading || !formik.isValid || !cart.length;

  return (
    <FormikProvider value={formik}>
      <form
        className="flex flex-row w-full p-10 justify-center gap-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="max-w-xl w-full space-y-10">
          {visible && <AlertBoxComponent />}
          <CustomerDetailsForm formik={formik} />
          <ShippingAddressForm formik={formik} />
          <BillingAddressForm formik={formik} />
        </div>
        <div className="space-y-10">
          <PaymentMethodForm formik={formik} />
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <div>Subtotal</div>
                <div className="ml-auto">${totalPrice?.toFixed(2)}</div>
              </div>
              <div className="flex items-center">
                <div>Tax</div>
                <div className="ml-auto">$0.00</div>
              </div>
              <div className="flex items-center">
                <div>Shipping</div>
                <div className="ml-auto">$0.00</div>
              </div>
              <Separator />
              <div className="flex items-center font-medium">
                <div>Total</div>
                <div className="ml-auto">${totalPrice?.toFixed(2)}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto" disabled={isBtnDisabled} variant="default">
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </FormikProvider>
  );
};
export default CheckoutPage;
