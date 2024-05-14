import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          <div className="container">
            <Outlet />
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
