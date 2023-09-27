// create public router

import PageLayout from "../components/PageLayout/PageLayout";
import Brand from "../pages/brand/Brand";
import Category from "../pages/category/Category";
import Dashboard from "../pages/dashboard/Dashboard";
import Permission from "../pages/permissions/Permission";
import Profile from "../pages/profile/Profile";
import Role from "../pages/roles/Role";
import Tag from "../pages/tag/Tag";
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
          {
            path: "/brand",
            element: <Brand />,
          },
          {
            path: "/tag",
            element: <Tag />,
          },
          {
            path: "/category",
            element: <Category />,
          },
        ],
      },
    ],
  },
];

// export router
export default PrivateRouter;
