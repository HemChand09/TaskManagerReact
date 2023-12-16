import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import Logo from "../public/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getItem } from "../services/Offlinestorage";
import { setUsers } from "../store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getItem("token");
  const user = getItem("user");
  const userData = JSON.parse(user);

  const logoutHandler = () => {
    dispatch(setUsers({ token: null, user: null }));
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <div>
                      <img
                        className="h-14 w-auto overflow-y-auto"
                        src={Logo}
                      ></img>
                  </div>
                  <div className="mr-8">
                    <ul className="flex ">
                      {userData?.roles === "admin" ? (
                        <li className="mx-4 text-gray-600  font-bold cursor-pointer hover:text-gray-800">
                          {" "}
                          <Link to="/admindashboard">Admin Dashboard</Link>
                        </li>
                      ) : (
                        <>
                          <li className="mx-4 text-gray-600  font-bold cursor-pointer hover:text-gray-800">
                            {" "}
                            <Link to="/">Home</Link>
                          </li>
                          <li className="mx-4 text-gray-600  font-bold cursor-pointer hover:text-gray-800">
                            {" "}
                            <Link to="/list">Task List</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {token ? (
                <div className="flex gap-6 justify-center">
                  <h1 className="text-gray-600 mt-1 text-sm">
                    Welcome <span className="font-bold text-lg">{userData?.name}</span>
                  </h1>
                  <button
                    className="mx-2 font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  className="mx-2 font-semibold text-white rounded-lg p-2 bg-blue-400"
                  onClick={() => navigate("/signin")}
                >
                  SignIn
                </button>
              )}
            </div>
          </div>
          {/* { openSidebar && <Checkout open={openSidebar} openSideNav={openSideNav}/>} */}
        </>
      )}
    </Disclosure>
  );
}
