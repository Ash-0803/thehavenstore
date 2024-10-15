import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "../AuthSlice";

function Protected({ children }) {
  const userToken = useSelector(selectLoggedInUserToken);

  if (!userToken) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
