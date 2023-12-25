import { apiSlice } from '../api/api.slice';
import { UserDetailsCacheTagsEnum } from './user-details.tags';
import { UserDetailsResponse } from './user-details.types';

const userDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetailsResponse, void>({
      query: () => 'user-details',
      providesTags: [UserDetailsCacheTagsEnum.USER_DETAILS]
    })
  })
});

export const { useGetUserDetailsQuery } = userDetailsApiSlice;
