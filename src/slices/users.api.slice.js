import { USERS_URL } from '../environments/environment';

import { apiSlice } from './api.slice';

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: USERS_URL }),
      keepUnusedDataFor: 5,
      providesTags: ['Users'],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
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
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersSlice;
