import { apiSlice } from '../api/apiSlice';
import { LoginResponse, WhoResponse } from './types';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string; remember: boolean }>({
      query: (credentials) => ({
        url: 'auth/local/signin',
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'auth/local/signup',
        method: 'POST',
        body: credentials
      })
    }),
    who: builder.query<WhoResponse, void>({
      query: () => 'auth/who'
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST'
      })
    })
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useWhoQuery,
  useRefreshMutation
} = authApiSlice;
