import { useGetUsersTasksQuery } from "../store";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
const UserTasksList = () => {
  const { userId } = useParams();
  const { data: gettasks, isLoading, isError } = useGetUsersTasksQuery(userId);
  console.log( gettasks,"User list is Called")
    useEffect(()=>{
      // refetch();
    } ,[gettasks ,gettasks])
  return (
    <div className="my-10">
      <div className="grid w-1/2 m-auto col-span-1">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              {isLoading && <>Loading Please Wait...</>}
              {isError && <>Error occured Please check</>}
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Completed 
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Updated At 
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gettasks?.data.length >0 ? gettasks?.data?.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {moment.unix(person?.dueDate  ).format("DD-MM-YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.completed === true ? 'Completed ':"Not Completed" }
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person?.updatedAt ? moment.unix(person?.updatedAt  ).format("DD-MM-YYYY") : 'Not Updated'}
                      </td>
                    </tr>
                  )):<div className=" my-10 flex text-gray-600 font-bold text-2xl justify-center items-center">No Tasks</div>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserTasksList;
