import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./features/common/Footer";
import Navbar from "./features/common/Nav";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserAsync } from "./features/User/UserSlice";
import {
  checkAuthAsync,
  selectLoggedInUserToken,
} from "./features/auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { selectGlobalStatus } from "./features/home/extra slices/commonSlice";
import LoadingScreen from "./pages/LoadingScreenPage";

function App() {
  const dispatch = useDispatch();
  const globalStatus = useSelector(selectGlobalStatus);
  const userToken = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, userToken]);

  //TODO ; think of a way to remember last visited url.

  return (
    <div className="App bg-white">
      {globalStatus === "idle" ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

export default App;
