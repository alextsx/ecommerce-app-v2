import { Field, FormikProps } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';

export const PaymentMethodForm = ({ formik }: { formik: FormikProps<CheckoutFormType> }) => {
  const { setFieldValue, values } = formik;

  const handlePaymentMethodChange = (value: string) => {
    setFieldValue('paymentMethod', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RadioGroup
            name="paymentMethod"
            value={values.paymentMethod}
            onValueChange={handlePaymentMethodChange}
          >
            <Label className="flex items-center gap-2" htmlFor="stripe">
              <Field as={RadioGroupItem} id="stripe" value="stripe" />
              Stripe
            </Label>
            <Label className="flex items-center gap-2" htmlFor="cod">
              <Field as={RadioGroupItem} id="cod" value="cod" />
              Pay at Delivery
            </Label>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
