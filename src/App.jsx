import { RouterProvider, useNavigate } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./features/auth/authApiSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
