import { Field, FormikProps } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/shadcn-utils';
import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';
import { Checkbox } from '../ui/checkbox';

export const BillingAddressForm = ({ formik }: { formik: FormikProps<CheckoutFormType> }) => {
  const { touched, errors, values, setFieldValue } = formik;
  const disabled = values['billing-same-as-shipping'];

  const handleSameAsShippingChange = () => {
    const newValue = !values['billing-same-as-shipping'];
    setFieldValue('billing-same-as-shipping', newValue);
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
            checked={values['billing-same-as-shipping']}
            onCheckedChange={handleSameAsShippingChange}
          />
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          values['billing-same-as-shipping'] ? 'hidden' : '',
          'space-y-2 transition-all ease-in-out duration-500'
        )}
      >
        <div>
          <Label htmlFor="billing-line1">Address Line 1</Label>
          <Field
            as={Input}
            name="billing-line1"
            placeholder="123 Main St"
            disabled={disabled}
            error={touched['billing-line1'] && errors['billing-line1']}
          />
        </div>
        <div>
          <Label htmlFor="billing-line2">Address Line 2</Label>
          <Field
            as={Input}
            name="billing-line2"
            placeholder="Apt 4B"
            error={touched['billing-line2'] && errors['billing-line2']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-city">City</Label>
          <Field
            as={Input}
            name="billing-city"
            placeholder="New York"
            error={touched['billing-city'] && errors['billing-city']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-state">State</Label>
          <Field
            as={Input}
            name="billing-state"
            placeholder="NY"
            error={touched['billing-state'] && errors['billing-state']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-country">Country</Label>
          <Field
            as={Input}
            name="billing-country"
            placeholder="USA"
            error={touched['billing-country'] && errors['billing-country']}
            disabled={disabled}
          />
        </div>
        <div>
          <Label htmlFor="billing-zipcode">ZIP Code</Label>
          <Field
            as={Input}
            name="billing-zipcode"
            placeholder="10001"
            error={touched['billing-zipcode'] && errors['billing-zipcode']}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};
