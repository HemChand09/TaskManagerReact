import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
} from "../store";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { taskId } = useParams();
  const [postNewTask, isLoading, isError] = useCreateTaskMutation();
  const { data: singleTaskData } = useGetTaskByIdQuery(taskId);

  const [updateTask] = useUpdateTaskByIdMutation();
  const navigate = useNavigate();
  const resData = useSelector((state) => state);
  const resDataTrans = localStorage.getItem('user');
  const userParser = JSON.parse(resDataTrans)

  const [formState, setFormState] = useState({
    title: singleTaskData?.data?.task?.title || "",
    description: singleTaskData?.data?.task?.description || "",
    dueDate: singleTaskData?.data?.task?.dueDate || "",
    userId: resData?.auth?.user?.userId || userParser?.userId,
  });

  const taskPostHandler = async (e) => {
    e.preventDefault();
    console.log(resData?.auth?.user?.userId ,"getting Task id on post Call")
    if (!taskId || taskId === undefined) {
      await postNewTask(formState).then((res) =>{
        navigate("/list");
        window.location.reload();
      });
    } else {
      const taskObj = {
        title: formState.title || singleTaskData?.data?.task?.title,
        description:
          formState.description || singleTaskData?.data?.task?.description,
        dueDate: formState.dueDate || singleTaskData?.data?.task?.dueDate,
      };
      await updateTask({ taskId: taskId, taskObj }).then(() => {
        navigate("/list");
        window.location.reload();
      });
    }
  };
  useEffect(() => {}, [taskId, singleTaskData, formState]);

  const formattedDueDate = singleTaskData?.data?.task?.dueDate
    ? new Date(singleTaskData?.data?.task?.dueDate * 1000 + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : "";
  return (
    <div className="">
      <div className="m-10 felx justify-center">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl text-gray-600 my-4">
            Create New Task
          </h1>
        </div>
        <div className="grid  w-1/2 h-auto gap-4 mx-auto p-10 shadow-lg">
          <form className="relative" onSubmit={taskPostHandler}>
            <div className="">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                defaultValue={singleTaskData?.data?.task?.title}
                className="p-2 block w-full my-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Task Name"
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
              />
            </div>
            <div className="">
              <label
                htmlFor="comment"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Due Date
              </label>
              <input
                type="date"
                name="name"
                id="name"
                // value={formattedDueDate ? formattedDueDate  : ""}
                defaultValue={formattedDueDate}
                required
                className="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    dueDate: moment(e.target.value).unix(),
                  })
                }
              />
            </div>
            {/* <div className="">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium leading-6 text-gray-900"
              >
                Status
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e)=>setFormState({...formState , status:e.target.value})}
              >
                <option defaultValue="">Status</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div> */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm my-2 font-medium leading-6 text-gray-900"
              >
                Task Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  required
                  defaultValue={singleTaskData?.data?.task?.description}
                  className="block w-full  rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate("/list")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {taskId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default HomePage;
