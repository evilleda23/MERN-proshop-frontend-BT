import { apiSlice } from './api.slice';

import { ORDERS_URL } from '../environments/environment';

export const ordersApiSclice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({ url: ORDERS_URL }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({ url: `${ORDERS_URL}/myorders` }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => ({ url: `${ORDERS_URL}/${id}` }),
      keepUnusedDataFor: 5,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = ordersApiSclice;
