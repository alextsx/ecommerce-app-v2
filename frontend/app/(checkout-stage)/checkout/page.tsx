'use client';

import { HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { BillingAddressForm } from '@/components/form/BillingAddressForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useLoginMutation } from '@/redux/auth/auth.api.slice';
import { checkoutSchema } from '@/schemas/checkout.schema';

type LoginFormProps = HTMLAttributes<HTMLFormElement>;
type LoginFormValuesType = {
  email: string;
  password: string;
  remember: boolean;
};

const initialValues: LoginFormValuesType = {
  email: '',
  password: '',
  remember: false
};

const CheckoutPage = () => {
  const router = useRouter();

  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  const onSubmit = async (values: any) => {
    hide();
    const { email, password, remember } = values;
    try {
      toggleToast({
        title: 'Success',
        description: 'You are now logged in!',
        variant: 'default'
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
    validateOnBlur: true
  });

  const isBtnDisabled = /* isLoading || ! */ formik.isValid;

  return (
    <div className="flex flex-row w-full p-10 justify-center gap-10">
      <FormikProvider value={formik}>
        <div className="max-w-xl w-full space-y-10">
          <BillingAddressForm formik={formik} />
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="w-full space-y-4">
                <div>
                  <Label htmlFor="shipping-name">Name</Label>
                  <Input id="shipping-name" placeholder="Name" />
                </div>
                <div>
                  <Label htmlFor="shipping-address">Address</Label>
                  <Input id="shipping-address" placeholder="Address" />
                </div>
                <div>
                  <Label htmlFor="shipping-city">City</Label>
                  <Input id="shipping-city" placeholder="City" />
                </div>
                <div>
                  <Label htmlFor="shipping-zip">ZIP</Label>
                  <Input id="shipping-zip" placeholder="ZIP" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-10">
          <Card>
            <CardHeader>
              <CardTitle>Payment Option</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioGroup defaultValue="stripe" id="payment-option">
                  <Label className="flex items-center gap-2" htmlFor="stripe">
                    <RadioGroupItem id="stripe" value="stripe" />
                    Stripe
                  </Label>
                  <Label className="flex items-center gap-2" htmlFor="delivery">
                    <RadioGroupItem id="delivery" value="delivery" />
                    Pay at Delivery
                  </Label>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <div>Subtotal</div>
                <div className="ml-auto">$169.00</div>
              </div>
              <div className="flex items-center">
                <div>Tax</div>
                <div className="ml-auto">$15.00</div>
              </div>
              <div className="flex items-center">
                <div>Shipping</div>
                <div className="ml-auto">$5.00</div>
              </div>
              <Separator />
              <div className="flex items-center font-medium">
                <div>Total</div>
                <div className="ml-auto">$189.00</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" variant="default">
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </FormikProvider>
    </div>
  );
};
export default CheckoutPage;
