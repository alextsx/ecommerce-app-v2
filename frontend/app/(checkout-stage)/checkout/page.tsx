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
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { selectCart, selectCartTotal } from '@/redux/cart/cart.slice';
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
  useEffect(() => {
    if (!cart.length) {
      router.push('/cart');
    }
  }, [cart.length, router]);

  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  const onSubmit = async (values: any) => {
    hide();
    console.log(values);
    try {
      toggleToast({
        title: 'Success',
        description: 'Order successfully placed!',
        variant: 'constructive'
      });

      router.push('/');
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

  const isBtnDisabled = /* isLoading || ! */ !formik.isValid || !cart.length;

  return (
    <FormikProvider value={formik}>
      <form
        className="flex flex-row w-full p-10 justify-center gap-10"
        onSubmit={handleSubmit}
        noValidate
      >
        {visible && <AlertBoxComponent />}
        <div className="max-w-xl w-full space-y-10">
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
                <div className="ml-auto">${totalPrice}</div>
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
                <div className="ml-auto">${totalPrice}</div>
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
