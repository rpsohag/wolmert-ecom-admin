import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter";
import privateRouter from "./privateRouter";


// create browser rotuer
const router = createBrowserRouter([...publicRouter, ...privateRouter]);

export default router;