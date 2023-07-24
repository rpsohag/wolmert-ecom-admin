// create public router

import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Permission from "../pages/permissions/Permission";
import Profile from "../pages/profile/Profile";
import Role from "../pages/roles/Role";
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
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/roles",
            element: <Role />,
          },
          {
            path: "/permissions",
            element: <Permission />,
          },
        ],
      },
    ],
  },
];

// export router
export default PrivateRouter;
