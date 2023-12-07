import { apiSlice } from '../api/api.slice';
import { UserDetailsResponse } from './types';
import { UserDetailsCacheTagsEnum } from './user-details.tags';

const userDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetailsResponse, void>({
      query: () => 'user-details',
      providesTags: [UserDetailsCacheTagsEnum.USER_DETAILS]
    })
  })
});

export const { useGetUserDetailsQuery } = userDetailsApiSlice;
