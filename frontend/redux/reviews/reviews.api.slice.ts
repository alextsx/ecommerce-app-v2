import { apiSlice } from '../api/api.slice';
import { ReviewsCacheTagsEnum } from './reviews.tags';
import { ReviewsResponse } from './reviews.types';

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewsResponse, { page: number; slug: string }>({
      query: ({ page, slug }: { page: number; slug: string }) => ({
        url: 'reviews',
        params: {
          page,
          slug
        }
      }),
      providesTags: (result, error, { slug, page }) => [
        {
          type: ReviewsCacheTagsEnum.reviews,
          id: `${slug}-${page}`
        }
      ]
    })
  })
});

export const { useGetReviewsQuery } = reviewsApiSlice;
