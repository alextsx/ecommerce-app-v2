import { Field, FormikProps } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckoutFormType } from '@/app/(checkout-stage)/checkout/page';

export const CustomerDetailsForm = ({ formik }: { formik: FormikProps<CheckoutFormType> }) => {
  const { touched, errors } = formik;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Field
            as={Input}
            name="firstName"
            placeholder="First Name"
            error={touched.firstName && errors.firstName}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Field
            as={Input}
            name="lastName"
            placeholder="Last Name"
            error={touched.lastName && errors.lastName}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Field
            as={Input}
            name="email"
            placeholder="Email"
            error={touched.email && errors.email}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Field
            as={Input}
            name="phone"
            placeholder="Phone"
            error={touched.phone && errors.phone}
          />
        </div>
      </CardContent>
    </Card>
  );
};
