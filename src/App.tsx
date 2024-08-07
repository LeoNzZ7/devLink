import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} limit={1} />
      <RouterProvider router={router} />
    </>
  )
}

export default App