import { Field, FormikProps } from 'formik';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UpdateProfileFormType } from '@/app/profile/page';

export const UpdateUserDetailsForm = ({
  formik
}: {
  formik: FormikProps<UpdateProfileFormType>;
}) => {
  const { touched, errors } = formik;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>User Details</CardTitle>
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
