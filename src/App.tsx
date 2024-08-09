import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} limit={1} />
    </>
  )
}

export default App