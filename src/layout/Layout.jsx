import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
