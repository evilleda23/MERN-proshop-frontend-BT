import { apiSlice } from './api.slice';

import { ORDERS_URL, PAYPAL_URL } from '../environments/environment';

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
    getPaypalClientId: builder.query({
      query: () => ({ url: `${PAYPAL_URL}` }),
      keepUnusedDataFor: 5,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetPaypalClientIdQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = ordersApiSclice;
