import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Pages/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path:"",
                element: <Home></Home>
            }
        ]        
    },  
    
    {
        path: "/*",
        element: <h1>404</h1>
    },
])
export default router