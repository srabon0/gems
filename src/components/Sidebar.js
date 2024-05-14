import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";

const Sidebar = () => {
  const { state, logoutUser } = useAppContext();
  const navigate = useNavigate();

  const logoutFrom = () => {
    logoutUser();
    navigate("/login");
  };
  useEffect(() => {
    if (!state.currentUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 h-screen bg-base-200 text-base-content">
        <h1 className="block sm:hidden">
          Logged in as{" "}
          <span className="font-bold text-lg">
            {state.currentUser?.Role.toUpperCase()}
          </span>
        </h1>
        {/* Sidebar content here */}

        {/* for admin  */}
        {state.currentUser?.Role == "admin" && (
          <>
            <li className="mt-2">
              <NavLink to="/">
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                  />
                </svg>
                All User
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink to="/adduser">
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add User
              </NavLink>
            </li>
          </>
        )}

        <button
          onClick={logoutFrom}
          className="btn btn-active btn-neutral btn-sm mt-4 absolute bottom-10"
        >
          <svg
            class="w-6 h-6 -rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
            />
          </svg>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
