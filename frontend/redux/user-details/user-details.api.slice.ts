import { apiSlice } from '../api/api.slice';
import { UserDetailsCacheTagsEnum } from './user-details.tags';
import { UpdateUserDetailsRequestBody, UserDetailsResponse } from './user-details.types';

const userDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetailsResponse, void>({
      query: () => 'user-details',
      providesTags: [UserDetailsCacheTagsEnum.USER_DETAILS]
    }),
    updateUserDetails: builder.mutation<void, UpdateUserDetailsRequestBody>({
      query: (values: UpdateUserDetailsRequestBody) => ({
        url: 'user-details',
        method: 'PUT',
        body: values
      }),
      invalidatesTags: [UserDetailsCacheTagsEnum.USER_DETAILS]
    })
  })
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = userDetailsApiSlice;
