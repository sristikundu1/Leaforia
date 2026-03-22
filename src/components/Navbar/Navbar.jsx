import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/Logo.png";
const Navbar = () => {
  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `mr-10 font-poppins text-lg font-bold pb-1 ${
            isActive
              ? "text-secondary  border-b-2 border-primary"
              : "text-accent hover:text-primary font-medium border-b-2 border-transparent"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/plants"}
        className={({ isActive }) =>
          `mr-10 font-poppins text-lg font-bold pb-1 ${
            isActive
              ? "text-secondary border-b-2 border-primary"
              : "text-accent hover:text-primary font-medium border-b-2 border-transparent"
          }`
        }
      >
        Plants
      </NavLink>
      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          `mr-10 font-poppins text-lg font-bold pb-1 ${
            isActive
              ? "text-secondary border-b-2 border-primary"
              : "text-accent hover:text-primary font-medium border-b-2 border-transparent"
          }`
        }
      >
        Profile
      </NavLink>
    </>
  );
  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md">
      <div className="navbar bg-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-10/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div>
            <img className="w-20 md:w-40 h-auto" src={logo} alt="logo" />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-8">
          <div className="dropdown dropdown-end">
            <div tabIndex={0}>
              <button className="btn bg-primary text-white px-6">login</button>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  p-4 shadow"
            >
              <p>Name</p>
              <button className="btn">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
