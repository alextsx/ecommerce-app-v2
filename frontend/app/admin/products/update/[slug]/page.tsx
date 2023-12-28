'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormikProvider, useFormik } from 'formik';
import { ProductForm } from '@/components/form/admin/ProductForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAlertBox } from '@/hooks/useAlertBox';
import { useToggleToast } from '@/hooks/useToggleToast';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useUpdateCategoryMutation } from '@/redux/categories/categories.api.slice';
import { useGetProductQuery, useUpdateProductMutation } from '@/redux/product/product.api.slice';
import { DetailedProduct } from '@/redux/product/product.types';
import { categorySchema } from '@/schemas/admin/category.schema';

export type ProductFormType = Omit<
  DetailedProduct,
  'slug' | 'rating' | 'formattedPrice' | 'discountedPriceFormatted' | 'productImages'
>;

const UpdateCategoryPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const router = useRouter();
  const { visible, show, hide, AlertBoxComponent } = useAlertBox();
  const toggleToast = useToggleToast();

  //mutations
  const [updateProduct, { isLoading: isLoadingMutation }] = useUpdateProductMutation();

  //queries
  const {
    data: product,
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct
  } = useGetProductQuery(slug);

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
      await updateProduct({
        slug,
        data: values
      }).unwrap();
      toggleToast({
        title: 'Product updated.',
        description: `Product ${values.name} has been updated.`,
        variant: 'constructive'
      });

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
    if (!product) return;
    setFieldValue('name', product.name);
    setFieldValue('price', product.price);
    setFieldValue('discountedPrice', product.discountedPrice);
    setFieldValue('description', product.description);
    setFieldValue('inventory', product.inventory);
    setFieldValue('category', product.category.toLowerCase());
    setFieldValue('isFeatured', product.isFeatured);
  }, [product, setFieldValue]);

  const isBtnDisabled = !formik.isValid;

  const isLoading = isLoadingMutation;

  if (isLoadingProduct || isFetchingProduct) return <div>Loading...</div>;

  if (!product) return <div>Category not found</div>;

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
              <CardTitle>Update product</CardTitle>
            </CardHeader>
            <CardContent>
              {visible && <AlertBoxComponent />}
              <ProductForm formik={formik} disabled={isLoading} />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={isBtnDisabled}
                  variant="default"
                >
                  Update product
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
