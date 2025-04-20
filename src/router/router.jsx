import Layout from "@/layout/Layout";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/home/Home";
import BusinessProfileForm from "@/pages/profile/BusinessProfileForm";
import Tutorials from "@/pages/Tutorials";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/log-in",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <BusinessProfileForm />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
    ],
  },
]);

export default router;
