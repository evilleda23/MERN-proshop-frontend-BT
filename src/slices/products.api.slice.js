import { PRODUCTS_URL } from '../environments/environment';

import { apiSlice } from './api.slice';

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productsSlice;
