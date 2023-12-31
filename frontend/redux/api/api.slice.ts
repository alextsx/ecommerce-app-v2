import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react';
import { deleteCredentials, setAccessToken } from '../auth/auth.slice';
import { authCacheTags } from '../auth/auth.tags';
import { RefreshResponse } from '../auth/auth.types';
import { categoriesCacheTags } from '../categories/categories.tags';
import { orderCacheTags } from '../order/order.tags';
import { productCacheTags } from '../product/product.tags';
import { productsCacheTags } from '../products/products.tags';
import { reviewsCacheTags } from '../reviews/reviews.tags';
import { RootState } from '../store';
import { userDetailsCacheTags } from '../user-details/user-details.tags';

const BACKEND_URL = process.env.BACKEND ?? 'http://localhost:3000';

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { access_token } = (getState() as RootState).auth;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  }
});

type BaseQueryArgs = Parameters<typeof baseQuery>[0];
type BaseQueryApi = Parameters<typeof baseQuery>[1];
type BaseQueryExtraOptions = Parameters<typeof baseQuery>[2];

const handleUnauthorized = (dispatch: Function, result: any) => {
  dispatch(deleteCredentials());
  return result;
};

let isRefreshing = false;
let refreshPromise: MaybePromise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> | null = null;

const baseQueryWithReauth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch, getState } = api;

  // everything is ok, we don't need to refresh the token
  if (!result.error) {
    return result;
  }

  // something went wrong, but it's not 401, so we don't need to refresh the token
  if (result.error?.status !== 401) {
    return result;
  }

  // we have 401, aka unauthorized, so we need to refresh the token

  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = baseQuery({ url: 'auth/refresh', method: 'POST' }, api, extraOptions);
  }

  const refreshResponse = await refreshPromise;
  isRefreshing = false;
  refreshPromise = null;

  if (!refreshResponse?.data) {
    return handleUnauthorized(dispatch, result);
  }

  const { access_token } = refreshResponse.data as RefreshResponse;
  if (!access_token) {
    return handleUnauthorized(dispatch, result);
  }

  dispatch(setAccessToken(access_token));

  result = await baseQuery(args, api, extraOptions);
  return result;
};

const tags = [
  ...authCacheTags,
  ...userDetailsCacheTags,
  ...productsCacheTags,
  ...productCacheTags,
  ...categoriesCacheTags,
  ...reviewsCacheTags,
  ...orderCacheTags
];
export type ApiTagType = (typeof tags)[number];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: tags
});
