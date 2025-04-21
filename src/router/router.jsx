import Layout from "@/layout/Layout";
import AboutUs from "@/pages/aboutUs/AboutUs";
import Login from "@/pages/Auth/Login";
import CreateEvents from "@/pages/createEvents/CreateEvents";
import EventPageUserView from "@/pages/eventPageUserVew/EventPageUserView";
import Home from "@/pages/home/Home";
import BusinessProfileForm from "@/pages/profile/BusinessProfileForm";
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
        path: "/profile",
        element: <BusinessProfileForm />,
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
        path: "/about-us",
        element: <AboutUs />,
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
        path: "/event-user-view",
        element: <EventPageUserView />,
      },
    ],
  },
]);

export default router;
