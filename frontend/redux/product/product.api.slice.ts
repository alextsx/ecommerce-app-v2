import { apiSlice } from '../api/api.slice';
import { DetailedProduct } from './product.types';
import { ProductCacheTagsEnum } from './products.tags';

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<DetailedProduct, string>({
      query: (id) => `product/${id}`,
      providesTags: (result, error, id) => [{ type: ProductCacheTagsEnum.PRODUCT, id }]
    })
  })
});

export const { useGetProductQuery } = productApiSlice;
