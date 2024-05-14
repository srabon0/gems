import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Appcontext";

const RequireAuth = ({ children }) => {
  const { state } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (!state.currentUser) {
      <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (localStorage.getItem("currentUser")) {
      state.currentUser =
        JSON.parse(localStorage.getItem("currentUser")) || null;
    }
  });

  return children;
};

export default RequireAuth;
