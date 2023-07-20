// create public router

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";
import PublicGuard from "./publicGuard";

const PublicRouter = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
    ],
  },
];

// export router
export default PublicRouter;
