import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Main = () => {
  const [submittedList, setSubmittedList] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const [user, setUser] = useState({
    id: "",
    employee_name: "",
    employee_salary: "",
    employee_age: "",
    profile_image: "",
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    if (searchKey) {
      setSubmittedList(
        submittedList.filter(
          (user) =>
            user.employee_name
              .toLowerCase()
              .includes(searchKey.toLowerCase()) ||
            user.id.toString().includes(searchKey) ||
            user.employee_salary.toString().includes(searchKey) ||
            user.employee_age.toString().includes(searchKey)
        )
      );
    } else {
      getAllEmployees();
    }
  }, [searchKey]);

  const deleteUser = (id) => {
    const updatedList = submittedList.filter((user) => user.id !== id);
    setSubmittedList(updatedList);
    fetch(`http://dummy.restapiexample.com/api/v1/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("User deleted successfully");
        } else {
          toast.error("User delete failed");
        }
      });
  };

  const getAllEmployees = () => {
    fetch("https://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API request failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSubmittedList(data?.data);
      })
      .catch((error) => {
        console.log("Fetching from JSON due to API failure:", error);
        toast.error("API request failed");
      });
  };

  const userEdit = (user) => {
    setUser(user);
    document.getElementById("my_modal_2").showModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      id: e.target.id.value,
      employee_name: e.target.employee_name.value,
      employee_salary: e.target.employee_salary.value,
      employee_age: e.target.employee_age.value,
      profile_image: "",
    };

    console.log("Updating user", user);
    const index = submittedList.findIndex((u) => u.id == user.id);

    if (index !== -1) {
      const newList = [...submittedList];
      newList[index] = user;
      setSubmittedList(newList);
    }

    e.target.reset();

    setUser({
      id: "",
      employee_name: "",
      employee_salary: "",
      employee_age: "",
      profile_image: "",
    });

    document.getElementById("my_modal_2").close();

    toast.success("User updated successfully");
    fetch(`http://dummy.restapiexample.com/api/v1/update/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("User updated successfully");
        } else {
          toast.error("User update failed");
        }
      });
  };

  return (
    <>
      <div className="p-5 w-7/12 lg:w-full">
        <h2 className="text-xl mb-2"> User Table </h2>
        <label className="flex items-center gap-2 mb-3">
          <input
            onInput={(e) => setSearchKey(e.target.value)}
            type="text"
            placeholder="Type here"
            className=" grow input input-bordered "
          />
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>

        <div className="overflow-x-scroll max-w-screen-sm lg:max-w-full lg:overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile Image</th>
                <th>Name</th>

                <th>Salary</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedList.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>
                    <img
                      src={user.profile_image}
                      alt={user.employee_name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{user.employee_name}</td>
                  <td>{user.employee_salary}</td>
                  <td>{user.employee_age}</td>

                  <th>
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          userEdit(user);
                        }}
                        className="btn btn-ghost btn-xs"
                      >
                        <svg
                          class="w-6 h-6 "
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
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                        Edit
                      </button>

                      <span className="border border-top h-5 border-gray-700 mx-2"></span>

                      <button
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                        className="btn btn-ghost btn-xs"
                      >
                        <svg
                          class="w-6 h-6 text-red-500"
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
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal start */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{user.employee_name}</h3>
          <form className="bg-white" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold">Id</label>
              <input
                type="text"
                name="id"
                defaultValue={user.id}
                readOnly
                disabled
                className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold">Name</label>
              <input
                type="text"
                name="employee_name"
                defaultValue={user.employee_name}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold">
                Salary
              </label>
              <input
                type="text"
                name="employee_salary"
                defaultValue={user.employee_salary}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 font-semibold">Age</label>
              <input
                type="number"
                name="employee_age"
                defaultValue={user.employee_age}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-2 flex justify-around items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update User
              </button>

              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => document.getElementById("my_modal_2").close()}
              >
                close
              </button>
            </div>
          </form>
        </div>
        {/* modal end  */}
      </dialog>
    </>
  );
};

export default Main;
