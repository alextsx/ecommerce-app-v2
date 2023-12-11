import { Field } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const PaymentMethodForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik;

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('paymentMethod', event.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RadioGroup
            id="payment-option"
            value={values.paymentMethod}
            onChange={handlePaymentMethodChange}
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
