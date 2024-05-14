import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Notfound from "../pages/Notfound";
import AddUser from "../pages/AddUser";
import RequireAuth from "../pages/Auth/RequireAuth";
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Main />
          </RequireAuth>
        ),
      },
      {
        path: "/adduser",
        element: (
          <RequireAuth>
            <AddUser />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <Notfound></Notfound>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Notfound></Notfound>,
  },
]);

export default routes;
