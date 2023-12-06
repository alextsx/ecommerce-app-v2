import { apiSlice } from '../api/api.slice';
import { UserDetailsResponse } from './types';

const userDetailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserDetailsResponse, void>({
      query: () => 'user-details',
      providesTags: ['user-details']
    })
  })
});

export const { useGetUserDetailsQuery } = userDetailsApiSlice;
