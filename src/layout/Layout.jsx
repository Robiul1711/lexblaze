import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
