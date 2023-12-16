import {
  TrashIcon,
  CheckIcon,
  PencilSquareIcon,
  HomeModernIcon,
} from "@heroicons/react/20/solid";
import {
  useDeleteTaskByIdMutation,
  useGetTasksListQuery,
  useUpdateTaskByIdMutation,
} from "../store";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./Modal";
import NotificationModal from "./NotificationModal";
import { taskApi } from "../store/apis/taskApi";

export default function TaskList() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const userDataTras = JSON.parse(userData);
  const [flag, setFlag] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [singleTask, setSingleTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const { data: listData, isLoading, isError } = useGetTasksListQuery();

  let filterTask = listData?.data?.tasks?.filter(
    (task) => task.userId === userDataTras?.userId
  );
  const [deleteTask, { isLoading: taskDeleteLoading }] =
    useDeleteTaskByIdMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskByIdMutation();

  const completeTaskHandler = async (task) => {
    console.log(task, " data In Update ");
    const taskObj = {
      title: task.title,
      description: task.description,
      completed: true,
    };
    setSingleTask(taskObj);
    setConfirmation(true);
    // await updateTask({ taskId: task.taskId, taskObj }).then(() =>{});
    await updateTask(task).then((res) => {
      console.log(res, "resDataaaInDaa");
      if (res?.data?.status === "success")
        setTimeout(() => window.location.reload(), 1000);
    });
  };
  const deletTaskHandler = async (taskId) => {
    setConfirmation(true);
    await deleteTask(taskId).then((res) => {
      window.location.reload();
    });
  };
  const updateTaskHandler = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const popHoverHandler = (e) => {
    setFlag(true);
    setSingleTask(e);
  };
  useEffect(() => {}, [singleTask, filterTask]);
  return (
    <div className="m-10">
      <div className="grid w-1/2 m-auto justify-around items-center">
        <h1 className="font-bold text-2xl text-gray-600 my-4 mx-10">Tasks</h1>
        <button
          className="text-sm flex  underline text-center items-center justify-center font-semibold"
          onClick={() => navigate("/")}
        >
          <HomeModernIcon
            className="h-5 w-5 mx-2 text-gray-600"
            aria-hidden="true"
          />
          Go Home
        </button>
      </div>
      <div className="py-1 my-4 w-1/2 m-auto bg-gray-100 "></div>

      <div className="flex justify-center">
        {isLoading && (
          <div className="text-2xl text-green-600 font-bold">Loading...</div>
        )}
        {isError && (
          <div className="text-2xl text-red-600 font-bold">
            Error: {isError.message}
          </div>
        )}
        {listData?.data?.tasks?.length === 0 && (
          <div className="text-2xl text-blue-600 font-bold">No Data Found</div>
        )}
      </div>
      <ul
        role="list"
        className="grid w-1/2 m-auto gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2"
      >
        {filterTask?.length > 0 ? (
          filterTask?.map((task) => (
            <li
              key={task.taskId}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <button
                className="flex justify-end m-4 underline text-gray-500"
                onClick={() => popHoverHandler(task)}
              >
                View
              </button>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="mt-2 p-2 text-sm font-medium text-gray-900 text-left">
                  {task.title}
                </h3>
                <div className="mt-1 p-2 flex  flex-col justify-between">
                  <span className=" text-gray-500 text-sm underline text-left">
                    Description :
                  </span>
                  <span className=" text-gray-500 text-left text-sm">
                    {task.description}
                  </span>
                </div>
                <div className=" mt-1 flex justify-between p-2 text-sm font-medium text-gray-500">
                  <span>Due Date :</span>
                  <span>{moment.unix(task.dueDate).format("DD-MM-YYYY")}</span>
                </div>
                {task.updatedAt && (
                  <div className=" mt-1 flex justify-between p-2 text-sm font-medium text-gray-500">
                    <span>UpdatedAt:</span>
                    <span>
                      {moment.unix(task.updatedAt).format("DD-MM-YYYY")}
                    </span>
                  </div>
                )}
                <div className=" mt-1 flex justify-between p-2 text-sm font-medium text-gray-500">
                  <span>Status</span>
                  <span
                    className={`text-sm ${
                      task.completed ? "text-green-600" : "text-indigo-600"
                    }`}
                  >{`${task.completed ? "Completed" : "Pending"}`}</span>
                </div>
              </div>

              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    {task?.completed ? (
                      <div className="text-sm px-2 m-auto flex justify-center items-center">
                        <h1>Complted</h1>
                      </div>
                    ) : (
                      <button
                        className={`relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900`}
                        onClick={() => completeTaskHandler(task)}
                      >
                        <CheckIcon
                          className="h-5 w-5 text-green-600 font-bold"
                          aria-hidden="true"
                        />
                        Complete
                      </button>
                    )}
                  </div>
                  {task?.completed ? (
                    <div className="text-sm px-2 m-auto flex justify-center items-center">
                      Can't Update Now
                    </div>
                  ) : (
                    <div className="flex w-0 flex-1">
                      <button
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        onClick={() => updateTaskHandler(task.taskId)}
                      >
                        <PencilSquareIcon
                          className="h-5 w-5 text-green-600 font-bold"
                          aria-hidden="true"
                        />
                        updated
                      </button>
                    </div>
                  )}

                  <div className="-ml-px flex w-0 flex-1">
                    {taskDeleteLoading ? (
                      <div className="text-sm flex justify-center items-center text-red-500">
                        Task Is Deleting...
                      </div>
                    ) : (
                      <button
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        onClick={() => deletTaskHandler(task.taskId)}
                      >
                        <TrashIcon
                          className="h-5 w-5  text-red-600"
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="text-gray-600 font-bold text-2xl flex justify-center my-10s">
            There is No Tasks for You
          </div>
        )}
      </ul>
      {flag && (
        <ModalComponent open={flag} setOpen={setFlag} task={singleTask} />
      )}
      {confirmation && (
        <NotificationModal
          open={confirmation}
          setOpen={setConfirmation}
          singleTask={singleTask}
        />
      )}
    </div>
  );
}
