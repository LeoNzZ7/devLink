import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import UserProvider from "./contexts/UserContext";

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} limit={1} />
    </UserProvider>
  )
}

export default App