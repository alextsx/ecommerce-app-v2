import { apiSlice } from '../api/api.slice';
import { CategoriesCacheTagsEnum } from './categories.tags';
import { Category } from './categories.types';

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `categories`,
        method: 'GET'
      }),
      providesTags: [CategoriesCacheTagsEnum.CATEGORY]
    })
  })
});

export const { useGetCategoriesQuery } = categoryApiSlice;
