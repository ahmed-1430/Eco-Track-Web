import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Pages/Home";
import Challenges from "../Pages/Challenges";
import ChallengeDetail from "../Pages/ChallengeDetail";


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
        path: "/challenges",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "", 
                element: <Challenges></Challenges>
            }
        ]
    },
    {
        path: "/challenges/:id",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "", 
                element: <ChallengeDetail></ChallengeDetail>
            }
        ]
    },  
    
    {
        path: "/*",
        element: <h1>404</h1>
    },
])
export default router