import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { AppProvider } from "./context/Appcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AppProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
