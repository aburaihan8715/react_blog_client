import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Write from "../pages/write/Write";
import Settings from "../pages/settings/Settings";
import Single from "../pages/single/Single";

// FIXME: if we do not want to data loader we should use BrowserRouter instead
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
    ],
  },
]);
