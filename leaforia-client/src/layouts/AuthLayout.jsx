import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
