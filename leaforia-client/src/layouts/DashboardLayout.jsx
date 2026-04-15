import React, { use } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { PiPottedPlantDuotone, PiUsersThreeBold } from "react-icons/pi";
import {
  HiOutlineReceiptRefund,
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/fav_icon.png";
import toast from "react-hot-toast";
import { BiLogOutCircle } from "react-icons/bi";
import { GiPlantRoots } from "react-icons/gi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { TfiWrite } from "react-icons/tfi";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = use(AuthContext);

  //  logout
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logout Successful!"))
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 shadow-sm px-4">
          {/* LEFT - Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            {/* Dashboard Title / Brand */}
            <div className="font-semibold text-lg text-primary">Dashboard</div>
          </div>

          {/* CENTER - Search (optional but looks pro) */}
          <div className="flex-1 hidden md:flex justify-center">
            <input
              type="text"
              placeholder="Search plants, users..."
              className="input input-bordered w-72 input-sm"
            />
          </div>

          {/* RIGHT - Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="btn btn-ghost btn-circle">🔔</button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border">
              <img
                src={user?.photoURL}
                alt={user.role}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + Role */}
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-primary text-sm">
                {user.displayName}
              </span>

              <span className="text-xs capitalize text-secondary">{role}</span>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col bg-secondary/10 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* TOP SECTION */}
          <ul className="menu w-full grow">
            {/* LOGO */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                <img className="w-6 h-6" src={logo} alt="logo" />
                <span className="is-drawer-close:hidden text-primary font-extrabold text-lg">
                  Leaforia
                </span>
              </Link>
            </li>

            <li>
              <span className="is-drawer-close:hidden text-primary">MENU</span>
            </li>

            {/* ADMIN ONLY */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/add-plants"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Plant"
                  >
                    <PiPottedPlantDuotone size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      Add Plant
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/all-plants"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Plants"
                  >
                    <GiPlantRoots size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      All Plants
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-articles"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Articles"
                  >
                    <TfiWrite size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      Add Articles
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <PiUsersThreeBold size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      User Management
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-orders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" Manage Orders"
                  >
                    <HiOutlineShoppingBag size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      Manage Orders
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/all-deliveries"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="  All Deliveries"
                  >
                    <HiOutlineTruck size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      All Deliveries
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* user only  */}
            {role === "user" && (
              <>
                <li>
                  <Link
                    to="/dashboard/order-tracking"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Order Tracking"
                  >
                    <HiOutlineCheckBadge size={20} className="text-primary" />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      Order Tracking
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Payments"
                  >
                    <HiOutlineReceiptRefund
                      size={20}
                      className="text-primary"
                    />
                    <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                      My Payments
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/*  BOTTOM SECTION */}
          <ul className="menu w-full">
            <li>
              <span className="is-drawer-close:hidden text-primary">
                SETTINGS
              </span>
            </li>

            {/* PROFILE */}
            <li>
              <Link
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <HiOutlineUserCircle size={20} className="text-primary" />
                <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                  Profile
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogOut}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <BiLogOutCircle size={20} className="text-primary" />
                <span className="is-drawer-close:hidden font-semibold text-secondary text-lg">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
