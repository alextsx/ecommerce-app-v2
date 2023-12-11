import { Field } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ShippingAddressForm = ({ formik }: { formik: any }) => {
  const { touched, errors } = formik;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="shipping-line1">Line 1</Label>
          <Field
            as={Input}
            name="shipping-line1"
            placeholder="Line 1"
            error={touched['shipping-line1'] && errors['shipping-line1']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-line2">Line 2</Label>
          <Field
            as={Input}
            name="shipping-line2"
            placeholder="Line 2"
            error={touched['shipping-line2'] && errors['shipping-line2']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-city">City</Label>
          <Field
            as={Input}
            name="shipping-city"
            placeholder="City"
            error={touched['shipping-city'] && errors['shipping-city']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-state">State</Label>
          <Field
            as={Input}
            name="shipping-state"
            placeholder="State"
            error={touched['shipping-state'] && errors['shipping-state']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-country">Country</Label>
          <Field
            as={Input}
            name="shipping-country"
            placeholder="Country"
            error={touched['shipping-country'] && errors['shipping-country']}
          />
        </div>
        <div>
          <Label htmlFor="shipping-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="shipping-zipcode"
            placeholder="ZIP Code"
            error={touched['shipping-zipcode'] && errors['shipping-zipcode']}
          />
        </div>
      </CardContent>
    </Card>
  );
};
