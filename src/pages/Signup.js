import { Link } from "react-router-dom";
import Logo from "../public/logo.png";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../store";
import { useEffect, useState } from "react";
import NotificationModal from "./NotificationModal";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [erroMessage, setErrorMessage] = useState("");

  const [signUpUser, { isLoading: signUpLoading, isError: signupError }] =
    useSignUpMutation();

  const signUpHandler = async (e) => {
    e.preventDefault();


    await signUpUser(user).then((res) => {
    if (res?.error?.data) {
      setErrorMessage(res?.error?.data?.message);
      return;
    }
      setTimeout(()=> {
        navigate("/signin");
      } ,1000)
     
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 justify-center my-10">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-16 my-6 w-auto m-auto"
                src={Logo}
                alt="Your Company"
              />
              <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up to your account
              </h2>
            </div>

            <div className="mt-4">
              <div>
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={signUpHandler}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      User Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        className=" px-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) =>
                          setUser({ ...user, passwordConfirm: e.target.value })
                        }
                        className="block w-full px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#dd8a44] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#935b2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {signUpLoading ? "User Signing.." : "Sign Up"}
                    </button>
                    <p className="mt-2 text-sm leading-6 text-gray-500 flex justify-end mx-2">
                      Already a member?{" "}
                      <a
                        href="#"
                        className="mx-2 font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        <Link to="/signin"> Sign in </Link>
                      </a>
                    </p>
                  </div>
                  {signupError && (
                    <div className="flex justify-center items-center text-red-600">
                      {" "}
                      ***{erroMessage} Please Signup***
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        {flag && (
          <NotificationModal open={flag} setOpen={setFlag} flag={flag} />
        )}
      </div>
    </>
  );
}
