import Layout from "@/layout/Layout";
import AboutUs from "@/pages/aboutUs/AboutUs";
import Login from "@/pages/Auth/Login";
import CreateEvents from "@/pages/createEvents/CreateEvents";
import UpdateEvent from "@/pages/createEvents/UpdateEvent";
import EventPageUserView from "@/pages/eventPageUserVew/EventPageUserView";
import Home from "@/pages/home/Home";
import BusinessProfileForm from "@/pages/profile/BusinessProfileForm";
import UpdateProfile from "@/pages/profile/UpdateProfile";
import ForgotPassword from "@/pages/resetPassword/ForgotPassword";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import VerifyOtp from "@/pages/resetPassword/VerifyOtp";
import Tutorials from "@/pages/tutorials/Tutorials";
import VenueUserView from "@/pages/venueUserView/VenueUserView";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import VanueUserViewPublic from "@/pages/venueUserView/VanueUserViewPublic";
import BusinessProfilePage from "@/pages/profile/BusinessProfilePage";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/VerifyOtp",
        element: <VerifyOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/profile",
        element: <BusinessProfilePage />,
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />,
          </PrivateRoute>
        ),
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent />,
          </PrivateRoute>
        ),
      },

      {
        path: "/venue-user-view/:user_id",
        element: <VanueUserViewPublic />,
      },
      {
        path: "/venue-profile-edit",
        element: (
          <PrivateRoute>
            <VenueUserView />,
          </PrivateRoute>
        ),
      },
      {
        path: "/event-user-view/:id",
        element: <EventPageUserView />,
      },
    ],
  },
]);

export default router;
