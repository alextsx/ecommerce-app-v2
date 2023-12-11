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
            name="shippingAddress.shipping-line1"
            placeholder="Line 1"
            error={
              touched.shippingAddress?.['shipping-line1'] &&
              errors.shippingAddress?.['shipping-line1']
            }
          />
        </div>
        <div>
          <Label htmlFor="shipping-line2">Line 2</Label>
          <Field
            as={Input}
            name="shippingAddress.shipping-line2"
            placeholder="Line 2"
            error={
              touched.shippingAddress?.['shipping-line2'] &&
              errors.shippingAddress?.['shipping-line2']
            }
          />
        </div>
        <div>
          <Label htmlFor="shipping-city">City</Label>
          <Field
            as={Input}
            name="shippingAddress.shipping-city"
            placeholder="City"
            error={
              touched.shippingAddress?.['shipping-city'] &&
              errors.shippingAddress?.['shipping-city']
            }
          />
        </div>
        <div>
          <Label htmlFor="shipping-state">State</Label>
          <Field
            as={Input}
            name="shippingAddress.shipping-state"
            placeholder="State"
            error={
              touched.shippingAddress?.['shipping-state'] &&
              errors.shippingAddress?.['shipping-state']
            }
          />
        </div>
        <div>
          <Label htmlFor="shipping-country">Country</Label>
          <Field
            as={Input}
            name="shippingAddress.shipping-country"
            placeholder="Country"
            error={
              touched.shippingAddress?.['shipping-country'] &&
              errors.shippingAddress?.['shipping-country']
            }
          />
        </div>
        <div>
          <Label htmlFor="shipping-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="shippingAddress.shipping-zipcode"
            placeholder="ZIP Code"
            error={
              touched.shippingAddress?.['shipping-zipcode'] &&
              errors.shippingAddress?.['shipping-zipcode']
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
