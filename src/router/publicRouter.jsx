

// create public router

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const publicRouter = [
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
];


// export router
export default publicRouter;