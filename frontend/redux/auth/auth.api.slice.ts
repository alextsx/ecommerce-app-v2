import { apiSlice } from '../api/api.slice';
import { UserDetailsCacheTagsEnum } from '../user-details/user-details.tags';
import { AuthCacheTagsEnum } from './auth.tags';
import { LoginResponse, WhoResponse } from './types';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string; remember: boolean }>({
      query: (credentials) => ({
        url: 'auth/local/signin',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: [AuthCacheTagsEnum.AUTH_DETAILS, UserDetailsCacheTagsEnum.USER_DETAILS]
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      invalidatesTags: [AuthCacheTagsEnum.AUTH_DETAILS, UserDetailsCacheTagsEnum.USER_DETAILS]
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'auth/local/signup',
        method: 'POST',
        body: credentials
      })
    }),
    who: builder.query<WhoResponse, void>({
      query: () => 'auth/who',
      providesTags: [AuthCacheTagsEnum.AUTH_DETAILS]
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
