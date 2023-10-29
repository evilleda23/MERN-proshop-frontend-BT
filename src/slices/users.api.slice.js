import { USERS_URL } from '../environments/environment';

import { apiSlice } from './api.slice';

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersSlice;