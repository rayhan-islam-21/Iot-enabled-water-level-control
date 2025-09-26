import { createBrowserRouter } from "react-router"
import MainLayout from "../Layouts/MainLayout"
import Home from "../pages/Home"
import AuthLayout from "../Layouts/AuthLayout"
import Login from "../auth/Login"
import Register from "../auth/Register"
import ManualControl from "../pages/ManualControl"
import ShowData from "../pages/ShowData"
import SettingsPage from "../pages/Setting"



const router = createBrowserRouter([
    {
        path:"/",
        Component: MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path: "manual-control",
                Component: ManualControl 
            },
            {
                path:"history",
                Component:ShowData
            },
            {
                path:"setting",
                Component:SettingsPage
            }
            
        ]
    },
    {
        path:"/auth",
        Component:AuthLayout,
        children:[
            {
                path:"login",
                Component:Login
            },
            {
                path:"register",
                Component:Register
            }
        ]
    }
])

export default router;