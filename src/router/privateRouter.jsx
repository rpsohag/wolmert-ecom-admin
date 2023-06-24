

// create public router

import Dashboard from "../pages/dashboard/Dashboard";

const privateRouter = [
    {
        path: "/",
        element: <Dashboard/>
    }
];


// export router
export default privateRouter;