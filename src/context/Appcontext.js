// AppContext.js
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create a context object
const AppContext = createContext();

// Create a context provider component
export function AppProvider({ children }) {
  const [state, setState] = useState({
    // Initial state goes here

    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    user: [
      {
        ID: 101,
        password: 1234,
        Name: "John Doe (Admin)",
        Designation: "Software Engineer",
        Role: "admin",
        DepartmentName: "Engineering",
        DOB: "1990-05-15",
        Email: "john@example.com",
        Mobile: "123-456-7890",
        startTime: "2020-01-01",
        endTime: "2021-01-01",
        WorkActivitiesLastYear:
          "Developed new features for the company's software.",
        Good: "",
        Marks: "",
        Submitted_to_rio: 0,
        Submitted_to_cso: 0,
        final_submit: 0,
      },
      // Add more user objects as needed
    ],
  });

  // Define functions to update the state
  const updateUser = (newUser) => {
    setState({ ...state, user: newUser });
  };

  const getUserById = (id) => {
    return state.user.find((user) => user.ID === id);
  };

  const setCurrentUser = (user) => {
    state.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logoutUser = () => {
    state.currentUser = null;
    localStorage.removeItem("currentUser");
  };

  const addUser = (user) => {
    const isIdExist = state.user.find((us) => us.ID == user.ID);
    if (isIdExist) {
      toast.error("User ID already exist");
    } else {
      state.user.push(user);
      updateUser(state.user);

      toast.success("User added successfully");
    }
  };

  const updateUserData = (user) => {
    const index = state.user.findIndex((us) => us.ID == user.ID);
    if (index !== -1) {
      state.user[index] = user;
      updateUser(state.user);

      toast.success("User updated successfully");
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
        getUserById,
        setCurrentUser,
        addUser,
        updateUserData,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to access the context
export function useAppContext() {
  return useContext(AppContext);
}
