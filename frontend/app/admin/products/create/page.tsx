'use client';

import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { ProductForm } from '@/components/form/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useCreateProductMutation } from '@/redux/product/product.api.slice';
import { categorySchema } from '@/schemas/admin/category.schema';
import { ProductFormType } from '../update/[slug]/page';

const CreateCategoryPage = () => {
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();
  const router = useRouter();

  //mutations
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // if logged in we use userdetails for initial values
  const initialValues: ProductFormType = {
    category: '',
    description: '',
    discountedPrice: 0,
    name: '',
    price: 0,
    inventory: 0,
    isFeatured: false
  };

  const onSubmit = async (values: ProductFormType) => {
    hide();
    try {
      await createProduct(values).unwrap();
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
        <div className="bg-background border rounded-md p-8 max-w-xl w-full space-y-10">
          {visible && <AlertBoxComponent />}
          <div>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Create product</CardTitle>
            </CardHeader>
            <ProductForm formik={formik} disabled={isLoading} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="ml-auto" disabled={isBtnDisabled} variant="default">
              Create product
            </Button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};
export default CreateCategoryPage;
