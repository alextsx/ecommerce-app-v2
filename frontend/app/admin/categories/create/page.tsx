'use client';

import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { CategoryForm } from '@/components/form/admin/CategoryForm';
import { Button } from '@/components/ui/button';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useCreateCategoryMutation } from '@/redux/categories/categories.api.slice';
import { categorySchema } from '@/schemas/admin/category.schema';

export type CreateCategoryFormType = {
  name: string;
};
const CreateCategoryPage = () => {
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();
  const router = useRouter();

  //mutations
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  // if logged in we use userdetails for initial values
  const initialValues: CreateCategoryFormType = {
    name: ''
  };

  const onSubmit = async (values: CreateCategoryFormType) => {
    hide();
    try {
      await createCategory(values).unwrap();
      toggleToast({
        title: 'Category created.',
        description: `Category ${values.name} has been created.`,
        variant: 'constructive'
      });
      router.push('/admin/categories');

      return;
    } catch (err) {
      const message = parseErrorResponse(err);
      show({
        message,
        title: 'Error',
        variant: 'destructive'
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: categorySchema,
    validateOnBlur: true,
    validateOnChange: true
  });

  const { values, touched, errors, handleSubmit } = formik;

  const isBtnDisabled = !formik.isValid;

  return (
    <FormikProvider value={formik}>
      <form
        className="flex flex-row w-full p-10 justify-center gap-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="max-w-xl w-full space-y-10">
          {visible && <AlertBoxComponent />}
          <CategoryForm formik={formik} disabled={isLoading} />
          <div className="flex justify-end">
            <Button type="submit" className="ml-auto" disabled={isBtnDisabled} variant="default">
              Create category
            </Button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};
export default CreateCategoryPage;
