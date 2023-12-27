import { apiSlice } from '../api/api.slice';
import { OrderCacheTagsEnum } from './order.tags';
import {
  CreateOrderRequestType,
  CreateOrderResponseType,
  OrderHistoryResponseType
} from './order.types';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLoggedInOrder: builder.mutation<CreateOrderResponseType, CreateOrderRequestType>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body
      }),
      invalidatesTags: [OrderCacheTagsEnum.ORDER_HISTORY]
    }),
    createGuestOrder: builder.mutation<CreateOrderResponseType, CreateOrderRequestType>({
      query: (body) => ({
        url: '/order/guest',
        method: 'POST',
        body
      })
    }),
    getOrderHistory: builder.query<OrderHistoryResponseType, void>({
      query: () => ({
        url: '/order/history',
        method: 'GET'
      }),
      providesTags: [OrderCacheTagsEnum.ORDER_HISTORY]
    })
  })
});

export const {
  useCreateLoggedInOrderMutation,
  useCreateGuestOrderMutation,
  useGetOrderHistoryQuery
} = orderApiSlice;
