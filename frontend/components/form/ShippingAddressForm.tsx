import { Field, FormikProps } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';

export const ShippingAddressForm = ({ formik }: { formik: FormikProps<CheckoutFormType> }) => {
  const { touched, errors } = formik;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <Label htmlFor="shipping-line1">Address Line 1</Label>
          <Field
            as={Input}
            name="shipping-line1"
            placeholder="123 Main St"
            error={touched['shipping-line1'] && errors['shipping-line1']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-line2">Address Line 2</Label>
          <Field
            as={Input}
            name="shipping-line2"
            placeholder="Apt 4B"
            error={touched['shipping-line2'] && errors['shipping-line2']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-city">City</Label>
          <Field
            as={Input}
            name="shipping-city"
            placeholder="New York"
            error={touched['shipping-city'] && errors['shipping-city']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-state">State</Label>
          <Field
            as={Input}
            name="shipping-state"
            placeholder="NY"
            error={touched['shipping-state'] && errors['shipping-state']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-country">Country</Label>
          <Field
            as={Input}
            name="shipping-country"
            placeholder="USA"
            error={touched['shipping-country'] && errors['shipping-country']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="shipping-zipcode"
            placeholder="10001"
            error={touched['shipping-zipcode'] && errors['shipping-zipcode']}
          />
        </div>
      </CardContent>
    </Card>
  );
};
