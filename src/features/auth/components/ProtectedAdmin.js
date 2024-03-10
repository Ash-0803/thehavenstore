import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";

export default function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}
