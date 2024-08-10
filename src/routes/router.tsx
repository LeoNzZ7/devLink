import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/home"
import { Private } from "./private"
import { Admin } from "../pages/admin"
import { Networks } from "../pages/networks"
import { SingIn } from "../pages/SingIn"
import { NotFound } from "../pages/notFound"
import { SingUp } from "../pages/SingUp"

export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/:id", element: <Home /> },
    { path: "/admin", element: <Private><Admin /></Private> },
    { path: "/admin/networks", element: <Networks /> },
    { path: "/singUp", element: <SingUp /> },
    { path: "/singIn", element: <SingIn /> },
    { path: "*", element: <NotFound /> }
])  