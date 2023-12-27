import { apiSlice } from '../api/api.slice';
import { CreateOrderRequestType, CreateOrderResponseType } from './order.types';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLoggedInOrder: builder.mutation<CreateOrderResponseType, CreateOrderRequestType>({
      query: (body) => ({
        url: '/order',
        method: 'POST',
        body
      })
    }),
    createGuestOrder: builder.mutation<CreateOrderResponseType, CreateOrderRequestType>({
      query: (body) => ({
        url: '/order/guest',
        method: 'POST',
        body
      })
    })
  })
});

export const { useCreateLoggedInOrderMutation, useCreateGuestOrderMutation } = orderApiSlice;
