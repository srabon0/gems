import React, { useState } from "react";
import { toast } from "react-toastify";
// import { useAppContext } from '../context/Appcontext';

const AddUser = () => {
  // const {addUser} = useAppContext();

  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    salary: "",
    age: "",
  });

  const resetForm = () => {
    setEmployeeData({
      id: "",
      name: "",
      salary: "",
      age: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(employeeData);
    resetForm();
    // You can handle form submission logic here, e.g., sending data to a server.
  };

  const addUser = (data) => {
    console.log("from AddUser ", data);
    fetch("http://dummy.restapiexample.com/api/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("User added successfully");
        } else {
          toast.success("User add Failed");
        }
      });
  };

  return (
    <div className="lg:w-4/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        Add User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Id</label>
          <input
            type="number"
            name="id"
            value={employeeData.ID}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">salary</label>
          <input
            type="text"
            name="salary"
            value={employeeData.salary}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Age</label>
          <input
            type="text"
            name="age"
            value={employeeData.age}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
