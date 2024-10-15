import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUserAsync, selectLoggedInUserToken } from "../AuthSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedInUserToken);
  useEffect(() => {
    dispatch(logoutUserAsync(userToken));
  }, [dispatch, userToken]);

  return <>{!userToken && <Navigate to="/login" replace={true} />};</>;
}
