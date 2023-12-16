
import {  useGetUsersQuery } from "../store";
import { useNavigate  , useLocation} from "react-router-dom";
const AdminDashBoard = () => {
  const navigate = useNavigate()

  const {
    data: userData,
    isLoading: usersLoading,
    isError: usersError,
    refetch,
  } = useGetUsersQuery();

  const viewUserHandler = async (person) => {
      navigate(`/usertaskslist/${person.userId}`);
  };

  return (
    <div className="my-10">
      <div className="flex my-4 justify-center items-center text-2xl font-bold">
        <h1 className="text-gray-600 underline ">All User list</h1>
      </div>
      <div className="grid w-1/2 m-auto">
        {usersLoading && <>Data Is isLoading</>}
        {usersError && <>Error While Fetching data </>}
        <ul role="list" className="divide-y divide-gray-100">
          {userData?.data?.users.map((person) => ( 
            <li
              key={person.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <span className="inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.email}
                  </p>
                </div>
              </div>
              <div className=" flex gap-4">
                <div>
                  <button
                    className="p-2 text-white text-sm bg-blue-500 rounded-md"
                    onClick={() => viewUserHandler(person)}
                  >
                    View Taks
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminDashBoard;
