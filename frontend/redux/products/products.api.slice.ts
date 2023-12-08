import { apiSlice } from '../api/api.slice';
import { Product } from '../product/product.types';
import { ProductsCacheTagsEnum } from './products.tags';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<Product[], void>({
      query: () => 'products/featured',
      providesTags: [ProductsCacheTagsEnum.FEATURED]
    }),

    getNewArrivalsProducts: builder.query<Product[], void>({
      query: () => 'products/new-arrivals',
      providesTags: [ProductsCacheTagsEnum.NEW_ARRIVALS]
    }),

    getBestSellersProducts: builder.query<Product[], void>({
      query: () => 'products/best-sellers',
      providesTags: [ProductsCacheTagsEnum.BEST_SELLERS]
    }),

    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      transformResponse: (response: PaginationResponse<Product>) => {
        return response.data;
      },
      providesTags: [ProductsCacheTagsEnum.PRODUCTS]
    })
  })
});

export const {
  useGetBestSellersProductsQuery,
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery,
  useGetProductsQuery
} = productsApiSlice;
