import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./features/navbar/Nav";

import { selectLoggedInUser } from "./features/auth/AuthSlice";
import { fetchLoggedInUserAsync } from "./features/User/UserSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
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
    <div className="App">
      <Navbar>
        <Outlet />
      </Navbar>
    </div>
  );
}

export default App;
