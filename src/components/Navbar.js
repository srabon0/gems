import React from "react";

const Navbar = () => {
  const { Role } = JSON.parse(localStorage?.getItem("currentUser"));

  return (
    <div className="w-screen lg:w-full navbar bg-base-300">
      <div className="flex-1 px-2 mx-2">
        <h1 className="text-2xl text-gray-600 font-bold">GEMS FRONTEND</h1>
      </div>
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          <li>
            <h2>
              Logged in as{" "}
              <span className="font-bold text-lg">{Role.toUpperCase()}</span>
            </h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
