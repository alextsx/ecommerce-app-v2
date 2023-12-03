import { apiSlice } from '../api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
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
    who: builder.query({
      query: () => 'auth/who'
    }),
    refresh: builder.query({
      query: () => 'auth/refresh'
    })
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useWhoQuery,
  useRefreshQuery
} = authApiSlice;
