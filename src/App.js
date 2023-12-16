import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./pages/Home";
import Navbar from "./pages/Navbar";
import TaskList from "./pages/TaskList";
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import { getItem } from "./services/Offlinestorage";
import PrivateRoute from "./pages/PrivateRoute";
import { useEffect } from "react";
import { setUsers } from "./store/index";
import AdminDashBoard from "./pages/AdminDashboard";
import UserTasksList from "./pages/UserTasksList";
import ErrorPage from "./pages/Error";

function App() {
  const dispatch = useDispatch();
  const token = getItem("token");
  const user = getItem("user");

  const userData = useSelector((state) => {
    const userWithToken = {
      token: state?.auth?.token,
      user: state?.auth?.user,
    };
    return userWithToken;
  });
  useEffect(() => {
    dispatch(setUsers({ token: token, user: user }));
  },[]);
  return (
    <Router>
      <div>
        {userData?.token && <Navbar />}
        <Routes>
          <Route
            path="/list"
            element={
              <PrivateRoute
                token={userData?.token}
                Component={TaskList}
              ></PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                token={userData?.token}
                Component={HomePage}
              ></PrivateRoute>
            }
          />
          <Route exact path="/signin"  element={<SignInPage />} />
          <Route exact path="/task/:taskId" element={<HomePage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/admindashboard" element={<AdminDashBoard />} />
          <Route exact path="/usertaskslist/:userId" element={<UserTasksList />} />
          {userData?.roles === "admin" && (
            <Route
              path="/admindashboard"
              element={
                <PrivateRoute
                  token={userData?.token}
                  Component={AdminDashBoard}
                ></PrivateRoute>
              }
            />
          )}
          <Route path="*" element={<ErrorPage /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
