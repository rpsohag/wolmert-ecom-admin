

// create public router

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from '../pages/auth/Forgot'

const publicRouter = [
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/forgot",
        element: <Forgot />
    }
];


// export router
export default publicRouter;