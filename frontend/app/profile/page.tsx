'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { BillingAddressForm } from '@/components/form/BillingAddressForm';
import { CustomerDetailsForm } from '@/components/form/CustomerDetailsForm';
import { PaymentMethodForm } from '@/components/form/PaymentMethodForm';
import { ShippingAddressForm } from '@/components/form/ShippingAddressForm';
import { UpdateUserDetailsForm } from '@/components/form/UpdateUserDetailsForm';
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
import { useUpdateUserDetailsMutation } from '@/redux/user-details/user-details.api.slice';
import { selectUserDetails } from '@/redux/user-details/user-details.slice';
import { checkoutSchema } from '@/schemas/checkout.schema';
import { updateProfileSchema } from '@/schemas/update-profile.schema';

export type UpdateProfileFormType = {
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
  phone: string;
};

const ProfilePage = () => {
  const isLoggedIn = useSelector(selectAccessToken);

  //notifications
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  //mutation
  const [updateUserDetails, { isLoading }] = useUpdateUserDetailsMutation();

  const onSubmit = async (values: UpdateProfileFormType) => {
    hide();
    try {
      await updateUserDetails(values).unwrap();
      toggleToast({
        title: 'Success',
        description: 'User details successfully updated!',
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

  const userDetails = useSelector(selectUserDetails);

  const { billingAddress, shippingAddress, firstName, lastName, phone } = userDetails;

  const initialValues: UpdateProfileFormType = {
    'billing-same-as-shipping': userDetails['billing-same-as-shipping'] || false,
    'billing-line1': billingAddress?.line1 || '',
    'billing-line2': billingAddress?.line2 || '',
    'billing-city': billingAddress?.city || '',
    'billing-state': billingAddress?.state || '',
    'billing-country': billingAddress?.country || '',
    'billing-zipcode': billingAddress?.zipcode || '',
    'shipping-line1': shippingAddress?.line1 || '',
    'shipping-line2': shippingAddress?.line2 || '',
    'shipping-city': shippingAddress?.city || '',
    'shipping-state': shippingAddress?.state || '',
    'shipping-country': shippingAddress?.country || '',
    'shipping-zipcode': shippingAddress?.zipcode || '',
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || ''
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: updateProfileSchema,
    validateOnBlur: true,
    validateOnChange: true
  });

  const { values, touched, errors, handleSubmit } = formik;

  const isBtnDisabled = !formik.isValid || isLoading;

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return (
    <>
      <FormikProvider value={formik}>
        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <h1 className="text-3xl font-bold text-center mb-10">Profile page</h1>
          <div className="max-w-2xl mx-auto space-y-10 ">
            {visible && <AlertBoxComponent />}
            <UpdateUserDetailsForm formik={formik} />
            <ShippingAddressForm formik={formik} />
            <BillingAddressForm formik={formik} />
            <div className="flex justify-end">
              <Button
                variant="default"
                className="text-2xl font-semibold"
                type="submit"
                disabled={isBtnDisabled}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};
export default ProfilePage;
