import { apiSlice } from '../api/api.slice';
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
    })
  })
});

export const { useGetProductQuery, useGetRelatedProductsQuery } = productApiSlice;
