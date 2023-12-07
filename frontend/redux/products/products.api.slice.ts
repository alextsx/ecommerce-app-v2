import { apiSlice } from '../api/api.slice';
import { ProductsCacheTagsEnum } from './products.tags';
import { Product } from './products.types';

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
