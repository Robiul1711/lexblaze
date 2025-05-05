import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <ScrollRestoration />
    <div className=" min-h-screen">
      <Navbar />
      <div className="min-h-screen">
      <Outlet  />

      </div>
      <Footer />

    </div>
    </>
  );
};

export default Layout;
