import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./features/navbar/Nav";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Outlet />
      </Navbar>
    </div>
  );
}

export default App;
