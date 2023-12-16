import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configService } from "../../config";
import { apiMethods } from "../../config/apiMethods";

const token = localStorage.getItem("token");

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: configService.usersConfig().url,
  }),
  endpoints: (builder) => {
    return {
      signUp: builder.mutation({
        query: (user) => ({
          url: configService.usersConfig().path.userSignUp,
          method: apiMethods.POST,
          body: user,
        }),
      }),
      signIn: builder.mutation({
        query: (user) => ({
          url: configService.usersConfig().path.userSignIn,
          method: apiMethods.POST,
          body: {
            email: user?.email,
            password: user?.password,
          },
        }),
      }),
      getUsers: builder.query({
        query: () => ({
          url: configService.usersConfig().path.getAllUsers,
          method: apiMethods.GET,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      getUsersById: builder.query({
        query: (userId) => ({
          url: `${configService.usersConfig().path.getUserById}${userId}`,
          method: apiMethods.GET,
        }),
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `${configService.usersConfig().path.deleteUser}${userId}`,
          method: apiMethods.DELETE,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }),
      }),
    };
  },
});

export const {
  useGetUsersByIdQuery,
  useGetUsersQuery,
  useSignInMutation,
  useSignUpMutation,
  useDeleteUserMutation,
} = userApi;
export { userApi };
