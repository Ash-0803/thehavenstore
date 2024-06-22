import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./features/common/Nav";
import Footer from "./features/common/Footer";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserAsync } from "./features/User/UserSlice";
import { selectLoggedInUser } from "./features/auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App bg-white">
      <Navbar />
      <Outlet />
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </div>
  );
}

export default App;
