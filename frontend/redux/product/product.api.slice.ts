import { ProductFormType } from '@/app/admin/products/update/[slug]/page';
import { apiSlice } from '../api/api.slice';
import { ProductsCacheTagsEnum } from '../products/products.tags';
import { ProductCacheTagsEnum } from './product.tags';
import { DetailedProduct, Product } from './product.types';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<DetailedProduct, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, error, id) => [{ type: ProductCacheTagsEnum.PRODUCT, id }]
    }),

    getRelatedProducts: builder.query<Product[], string>({
      query: (slug) => `product/${slug}/related`,
      providesTags: (result, error, slug) => [{ type: ProductCacheTagsEnum.RELATED, id: slug }]
    }),

    updateProduct: builder.mutation<void, { slug: string; data: ProductFormType }>({
      query: ({ slug, data }) => ({
        url: `product/${slug}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: ProductCacheTagsEnum.PRODUCT, id: slug },
        { type: ProductsCacheTagsEnum.PRODUCTS }
      ]
    }),

    createProduct: builder.mutation<void, ProductFormType>({
      query: (data) => ({
        url: `product`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: (result, error, data) => [{ type: ProductsCacheTagsEnum.PRODUCTS }]
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (slug) => ({
        url: `product/${slug}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, slug) => [{ type: ProductsCacheTagsEnum.PRODUCTS }]
    })
  })
});

export const {
  useGetProductQuery,
  useGetRelatedProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation
} = productApiSlice;
