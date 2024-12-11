import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, userToken]);

  // useEffect(() => {
  //   // Save the current URL before the page unloads
  //   const handleBeforeUnload = () => {
  //     localStorage.setItem("lastVisitedUrl", window.location.pathname);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Navigate to the saved URL if a user is found
  //   if (userToken) {
  //     const lastVisitedUrl = localStorage.getItem("lastVisitedUrl");
  //     if (lastVisitedUrl) {
  //       navigate(lastVisitedUrl);
  //     }
  //   }
  // }, [userToken, navigate]);

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
