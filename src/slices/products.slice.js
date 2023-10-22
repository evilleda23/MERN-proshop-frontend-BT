import { PRODUCTS_URL } from '../environments/environment';

import { apiSlice } from './api.slice';

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery } = productsSlice;
