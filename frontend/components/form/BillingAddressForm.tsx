import { Field } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

export const BillingAddressForm = ({ formik }: { formik: any }) => {
  const { touched, errors, values, setFieldValue } = formik;
  const disabled = values.billingAddress?.['billing-same-as-shipping'];

  const handleSameAsShippingChange = () => {
    const newValue = !values.billingAddress?.['billing-same-as-shipping'];
    setFieldValue('billingAddress.billing-same-as-shipping', newValue);

    if (newValue) {
      // Set the billing fields to the corresponding shipping fields
      setFieldValue('billingAddress.billing-line1', values.shippingAddress['shipping-line1']);
      setFieldValue('billingAddress.billing-line2', values.shippingAddress['shipping-line2']);
      setFieldValue('billingAddress.billing-city', values.shippingAddress['shipping-city']);
      setFieldValue('billingAddress.billing-state', values.shippingAddress['shipping-state']);
      setFieldValue('billingAddress.billing-country', values.shippingAddress['shipping-country']);
      setFieldValue('billingAddress.billing-zipcode', values.shippingAddress['shipping-zipcode']);
    }
  };
  //todo if same as shipping then values of them should be shippingAddress ...
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Billing Address</CardTitle>
        <div className="flex flex-row gap-4 text-5xl justify-center items-center">
          <Label htmlFor="billing-same-as-shipping" className="text-xl">
            Same as shipping
          </Label>
          <Field
            as={Checkbox}
            id="billing-same-as-shipping"
            checked={values.billingAddress?.['billing-same-as-shipping']}
            onCheckedChange={handleSameAsShippingChange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="billing-line1">Line 1</Label>
          <Field
            as={Input}
            name="billingAddress.billing-line1"
            placeholder="Line 1"
            error={
              touched.billingAddress?.['billing-line1'] && errors.billingAddress?.['billing-line1']
            }
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-line2">Line 2</Label>
          <Field
            as={Input}
            name="billingAddress.billing-line2"
            placeholder="Line 2"
            error={
              touched.billingAddress?.['billing-line2'] && errors.billingAddress?.['billing-line2']
            }
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-city">City</Label>
          <Field
            as={Input}
            name="billingAddress.billing-city"
            placeholder="City"
            error={
              touched.billingAddress?.['billing-city'] && errors.billingAddress?.['billing-city']
            }
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-state">State</Label>
          <Field
            as={Input}
            name="billingAddress.billing-state"
            placeholder="State"
            error={
              touched.billingAddress?.['billing-state'] && errors.billingAddress?.['billing-state']
            }
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-country">Country</Label>
          <Field
            as={Input}
            name="billingAddress.billing-country"
            placeholder="Country"
            error={
              touched.billingAddress?.['billing-country'] &&
              errors.billingAddress?.['billing-country']
            }
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="billingAddress.billing-zipcode"
            placeholder="ZIP Code"
            error={
              touched.billingAddress?.['billing-zipcode'] &&
              errors.billingAddress?.['billing-zipcode']
            }
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};
