import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="grid items-center">
      {" "}
      <div className="flex flex-row justify-center flex-1 mx-10 items-center">
        <div className="text-4xl font-bold m-6">Page Not Found 404</div>
      </div>
      <div className="text-gray-600 flex flex-row justify-center flex-1 mx-10 items-center">
        <Link to={"/"} className="text-blue-600 underline">
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
