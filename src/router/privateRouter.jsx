

// create public router

import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import User from "../pages/user/User";

const privateRouter = [
    {
        element: <PageLayout/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
            {
                path: "/users",
                element: <User/>
            }
        ]
    },
    {
        path: "/",
        element: <Dashboard/>
    }
];


// export router
export default privateRouter;