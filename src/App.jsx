import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./features/auth/authApiSlice";
import {
  getAllPermission,
  getAllRoles,
  getAllUser,
} from "./features/user/userApiSlice";
import {
  getAllBrand,
  getAllTags,
  getProductCategories,
} from "./features/product/productApiSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUser());
    dispatch(getAllBrand());
    dispatch(getAllTags());
    dispatch(getProductCategories());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
