import { CreateCategoryFormType } from '@/app/admin/categories/create/page';
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
    }),
    getCategoryBySlug: builder.query<Category, string>({
      query: (slug) => ({
        url: `category/${slug}`,
        method: 'GET'
      }),
      providesTags: [CategoriesCacheTagsEnum.CATEGORY]
    }),
    createCategory: builder.mutation<CreateCategoryFormType, Pick<Category, 'name'>>({
      query: (formValues) => ({
        url: `category`,
        method: 'POST',
        body: {
          name: formValues.name
        }
      }),
      invalidatesTags: [CategoriesCacheTagsEnum.CATEGORY]
    }),
    updateCategory: builder.mutation<void, { oldSlug: string; name: string }>({
      query: ({ oldSlug, name }) => ({
        url: `category/${oldSlug}`,
        method: 'PUT',
        body: {
          name
        }
      }),
      invalidatesTags: [CategoriesCacheTagsEnum.CATEGORY]
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (slug) => ({
        url: `category/${slug}`,
        method: 'DELETE'
      }),
      invalidatesTags: [CategoriesCacheTagsEnum.CATEGORY]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryBySlugQuery,
  useUpdateCategoryMutation
} = categoryApiSlice;
