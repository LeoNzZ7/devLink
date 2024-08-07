import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import { Networks } from "./pages/networks"
import { SingIn } from "./pages/login"
import { NotFound } from "./pages/notFound"
import { Private } from "./routes/private"

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/admin", element: <Private><Admin /></Private> },
  { path: "/admin/networks", element: <Networks /> },
  { path: "/login", element: <SingIn /> },
  { path: "*", element: <NotFound /> }
])  