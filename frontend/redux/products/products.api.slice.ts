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
    })
  })
});

export const {
  useGetBestSellersProductsQuery,
  useGetNewArrivalsProductsQuery,
  useGetFeaturedProductsQuery
} = productsApiSlice;
