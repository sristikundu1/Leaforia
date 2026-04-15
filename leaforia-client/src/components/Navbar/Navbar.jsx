import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../../assets/Logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  // detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  logout
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logout Successful!"))
      .catch((err) => toast.error(err.message));
  };

  //  reusable nav style
  const navClass = ({ isActive }) =>
    `px-3 py-1 transition-all duration-200 ${
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navClass}>
        Home
      </NavLink>
      <NavLink to="/plants" className={navClass}>
        Plants
      </NavLink>
      <NavLink to="/guides" className={navClass}>
        Guides
      </NavLink>

      {user && (
        <>
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isHome
          ? isScrolled
            ? "bg-white/70 text-gray-700 backdrop-blur-md shadow-md"
            : "bg-transparent"
          : "bg-[#688B58]/80 text-gray-700 shadow-md"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden cursor-pointer">
              <RiMenu2Line size={24} />
            </label>
            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="ml-2">
            <img src={logo} className="w-28 md:w-36" />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-4 items-center">
          {/* Icons */}
          <Link to={"/wishPlants"}>
            <FaRegHeart
              className={`cursor-pointer transition ${
                isScrolled ? "text-gray-700" : "text-white"
              } hover:text-primary`}
              size={20}
            />
          </Link>

          {/* Auth */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              </label>

              <ul className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white rounded-box w-52">
                <p className="font-semibold text-center">{user?.displayName}</p>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm mt-2 bg-primary text-white"
                >
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-primary text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
