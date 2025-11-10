import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOuts/MainLayout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,        
    },  
    
    {
        path: "/*",
        element: <h1>404</h1>
    },
])
export default router