import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configService } from "../../config";
import { apiMethods } from "../../config/apiMethods";

const token = localStorage.getItem("token");


const taskApi = createApi({
  reducerPath: "task",
  baseQuery: fetchBaseQuery({
    baseUrl: configService.taskConfig().url,
  }),
  tagTypes: ["task"],
  endpoints(builder) {
    return {
      getTaskListByUserId:builder.mutation({
        query:(userId)=>({
          url: `${configService.taskConfig().path.taskpath}/${userId}`,
          method: apiMethods.GET,
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }),
      createTask: builder.mutation({
        query: (body) => ({
          url: `${configService.taskConfig().path.taskpath}`,
          method: apiMethods.POST,
          body: body,
        }),
        invalidatesTags: ["task"],
      }),
      getTasksList: builder.query({
        query: () => ({
          url: configService.taskConfig().path.taskpath,
          method: apiMethods.GET,
        }),
        provideTags:(result , error , arg)=>{
            return result ? [...result.map(({ taskId }) => ({ type: 'task', taskId })), 'task']
            : ['task']
        },
      }),
      getTaskById: builder.query({
        query: (taskId) => ({
          url: `${configService.taskConfig().path.taskpath}/${taskId}`,
          method: apiMethods.GET,
        }),
      }),
      deleteTaskById: builder.mutation({
        query: (taskId) => ({
          url: `${configService.taskConfig().path.taskpath}/${taskId}`,
          method: apiMethods.DELETE,
        }),
        invalidatesTags:['task']
      }),
      updateTaskById: builder.mutation({
        query: (task) => {
          let taskObj ={
            completed:true,
            description:task?.description,
            dueDate:task?.dueDate,
            taskId:task?.taskId,
            title:task?.title,
            userId:task?.userId,
          }
          return {
            url: `${configService.taskConfig().path.taskpath}/${task.taskId}`,
            method: apiMethods.PATCH,
            body:taskObj,
          }
        },
        invalidatesTags:['task']
      }),
      getUsersTasks:builder.query({
        query:(userId)=>({
          url: `${configService.usersConfig().path.getUserTaskList}${userId}`,
          method: apiMethods.GET,
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      })
    };
  },
});
export const {
  useGetTasksListQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetUsersTasksQuery
} = taskApi;
export { taskApi };
