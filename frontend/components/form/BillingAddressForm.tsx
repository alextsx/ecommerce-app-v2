import { Field } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

export const BillingAddressForm = ({ formik }: { formik: any }) => {
  const { touched, errors, values, setFieldValue } = formik;
  const disabled = values['billing-same-as-shipping'];

  const handleSameAsShippingChange = () => {
    const newValue = !values['billing-same-as-shipping'];
    setFieldValue('billing-same-as-shipping', newValue);

    if (newValue) {
      // Set the billing fields to the corresponding shipping fields
      setFieldValue('billing-line1', values['shipping-line1']);
      setFieldValue('billing-line2', values['shipping-line2']);
      setFieldValue('billing-city', values['shipping-city']);
      setFieldValue('billing-state', values['shipping-state']);
      setFieldValue('billing-country', values['shipping-country']);
      setFieldValue('billing-zipcode', values['shipping-zipcode']);
    }
  };
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
            checked={values['billing-same-as-shipping']}
            onCheckedChange={() =>
              formik.setFieldValue('billing-same-as-shipping', !values['billing-same-as-shipping'])
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="billing-line1">Line 1</Label>
          <Field
            as={Input}
            name="billing-line1"
            placeholder="Line 1"
            error={touched['billing-line1'] && errors['billing-line1']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-line2">Line 2</Label>
          <Field
            as={Input}
            name="billing-line2"
            placeholder="Line 2"
            error={touched['billing-line2'] && errors['billing-line2']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-city">City</Label>
          <Field
            as={Input}
            name="billing-city"
            placeholder="City"
            error={touched['billing-city'] && errors['billing-city']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-state">State</Label>
          <Field
            as={Input}
            name="billing-state"
            placeholder="State"
            error={touched['billing-state'] && errors['billing-state']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-country">Country</Label>
          <Field
            as={Input}
            name="billing-country"
            placeholder="Country"
            error={touched['billing-country'] && errors['billing-country']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="billing-zipcode"
            placeholder="ZIP Code"
            error={touched['billing-zipcode'] && errors['billing-zipcode']}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};
