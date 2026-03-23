import React, { use } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/Logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { RiMenu2Line } from "react-icons/ri";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = use(AuthContext);
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

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut Successfully!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error);
      });
  };
  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md">
      <div className="navbar bg-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-10/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Line />
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

        {user ? (
          <div className="navbar-end ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="min-w-10 min-h-10 shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover "
                    alt="userImage"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <div
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3  p-4 shadow"
              >
                <p className="text-base-100 text-center font-semibold text-lg">
                  {user?.displayName}
                </p>
                <button
                  onClick={handleLogOut}
                  className="btn bg-primary text-white px-6"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-end gap-8">
            <NavLink
              to={"/auth/login"}
              className="btn bg-primary text-white px-6"
            >
              login
            </NavLink>

            <NavLink
              to={"/auth/register"}
              className="btn bg-primary text-white px-6"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
