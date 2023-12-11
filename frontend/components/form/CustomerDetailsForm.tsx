import { Field } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CustomerDetailsForm = ({ formik }: { formik: any }) => {
  const { touched, errors } = formik;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="customer.firstName">First Name</Label>
          <Field
            as={Input}
            name="customer.firstName"
            placeholder="First Name"
            error={touched.customer?.firstName && errors.customer?.firstName}
          />
        </div>
        <div>
          <Label htmlFor="customer.lastName">Last Name</Label>
          <Field
            as={Input}
            name="customer.lastName"
            placeholder="Last Name"
            error={touched.customer?.lastName && errors.customer?.lastName}
          />
        </div>
        <div>
          <Label htmlFor="customer.email">Email</Label>
          <Field
            as={Input}
            name="customer.email"
            placeholder="Email"
            error={touched.customer?.email && errors.customer?.email}
          />
        </div>
        <div>
          <Label htmlFor="customer.phone">Phone</Label>
          <Field
            as={Input}
            name="customer.phone"
            placeholder="Phone"
            error={touched.customer?.phone && errors.customer?.phone}
          />
        </div>
      </CardContent>
    </Card>
  );
};
