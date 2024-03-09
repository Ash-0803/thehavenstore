import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUserAsync, selectLoggedInUser } from "../AuthSlice";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(logoutUserAsync(user.dispatch));
  }, []);

  return <>{!user && <Navigate to="/login" replace={true} />};</>;
}
