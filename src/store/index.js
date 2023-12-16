import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  useGetTasksListQuery,
  taskApi,
  useCreateTaskMutation,
  useDeleteTaskByIdMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useGetUsersTasksQuery
} from "./apis/taskApi";
import {
  useGetUsersByIdQuery,
  useSignInMutation,
  useSignUpMutation,
  useGetUsersQuery,
  useDeleteUserMutation
} from "./apis/userApi";
import { userApi } from "./apis/userApi";
import { AuthSlice, setUsers } from "./globalUser";
const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(taskApi.middleware)
      .concat(userApi.middleware);
  },
});
setupListeners(store.dispatch);

export {
  store,
  useGetTasksListQuery,
  useCreateTaskMutation,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useGetTaskByIdQuery,
  useGetUsersByIdQuery,
  useSignInMutation,
  useSignUpMutation,
  useGetUsersQuery,
  setUsers,
  useDeleteUserMutation,
  useGetUsersTasksQuery
};
