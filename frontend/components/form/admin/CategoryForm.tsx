import { Field, FormikProps } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CategoryForm = ({
  formik,
  disabled
}: {
  formik: FormikProps<any>;
  disabled: boolean;
}) => {
  const { touched, errors } = formik;

  return (
    <div>
      <Label htmlFor="name">name</Label>
      <Field
        as={Input}
        name="name"
        disabled={disabled}
        placeholder="Category name"
        error={touched.name && errors.name}
      />
    </div>
  );
};
