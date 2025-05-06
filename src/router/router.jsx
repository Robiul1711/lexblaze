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
        element: <BusinessProfileForm />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        path: "/create-event",
        element: <CreateEvents />,
      },
      {
        path: "/update-event/:id",
        element: <UpdateEvent />,
      },

      {
        path: "/venue-user-view",
        element: <VenueUserView />,
      },
      {
        path: "/venue-profile-edit",
        element: <VenueUserView />,
      },
      {
        path: "/event-user-view/:id",
        element: <EventPageUserView />,
      },
    ],
  },
]);

export default router;
