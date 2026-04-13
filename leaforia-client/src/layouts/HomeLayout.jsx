import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";

const HomeLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // When the browser finishes loading the page...
    const handlePageLoad = () => {
      // Small delay (1.5s) so the loading icon is actually seen
      setTimeout(() => setIsLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  // If loading, only show the Loading component
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="animate-fade-in">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
