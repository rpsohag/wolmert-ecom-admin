// create public router

import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import User from "../pages/user/User";
import PrivateGuard from "./privateGuard";

const PrivateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <User />,
          },
        ],
      },
    ],
  },
];

// export router
export default PrivateRouter;
