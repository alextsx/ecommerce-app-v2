'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { CategoryForm } from '@/components/form/admin/CategoryForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import {
  useCreateCategoryMutation,
  useGetCategoryBySlugQuery,
  useUpdateCategoryMutation
} from '@/redux/categories/categories.api.slice';
import { categorySchema } from '@/schemas/admin/category.schema';

export type UpdateCategoryFormType = {
  name: string;
};
const UpdateCategoryPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter();
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  //mutations
  const [updateCategory, { isLoading: isLoadingMutation }] = useUpdateCategoryMutation();

  //queries
  const {
    data: category,
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory
  } = useGetCategoryBySlugQuery(slug);

  // if logged in we use userdetails for initial values
  const initialValues: UpdateCategoryFormType = {
    name: ''
  };

  const onSubmit = async (values: UpdateCategoryFormType) => {
    hide();
    try {
      await updateCategory({
        oldSlug: slug,
        name: values.name
      }).unwrap();
      toggleToast({
        title: 'Category updated.',
        description: `Category ${values.name} has been updated.`,
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

  const { values, touched, errors, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    if (!category) return;
    setFieldValue('name', category.name);
  }, [category, setFieldValue]);

  const isBtnDisabled = !formik.isValid;

  if (isLoadingCategory || isFetchingCategory) return <div>Loading...</div>;

  if (!category) return <div>Category not found</div>;

  return (
    <FormikProvider value={formik}>
      <form
        className="flex flex-row w-full p-10 justify-center gap-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="max-w-xl w-full space-y-10">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              {visible && <AlertBoxComponent />}
              <CategoryForm
                formik={formik}
                disabled={isFetchingCategory || isLoadingCategory || isLoadingMutation}
              />
              <div className="mt-4">
                <Label htmlFor="slug">slug</Label>
                <Input name="slug" disabled={true} value={category?.slug ?? ''} />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isBtnDisabled}
                  variant="default"
                >
                  Update category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormikProvider>
  );
};
export default UpdateCategoryPage;
