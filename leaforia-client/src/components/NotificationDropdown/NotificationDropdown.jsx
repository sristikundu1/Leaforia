import { useEffect, useState, useContext, use } from "react";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../contexts/AuthContext";
import { getFavPlants } from "../../utils/localStorage";

const NotificationDropdown = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { role, roleLoading } = useRole();

  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (!user || roleLoading) return;

    if (role === "admin") {
      axiosSecure.get("/admin/order-count").then((res) => {
        setOrderCount(res.data.count);
      });
    } else {
      const fav = getFavPlants();
      setWishlistCount(fav.length);
    }
  }, [user?.email, role, roleLoading]);

  // loading state (important)
  if (roleLoading) return null;

  return (
    <div className="dropdown dropdown-end">
      {/* ICON */}
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <IoNotifications className="text-2xl text-primary" />

          {/*  Dynamic Badge */}
          <span className="badge badge-sm indicator-item bg-primary text-white border-none">
            {role === "admin" ? orderCount : wishlistCount}
          </span>
        </div>
      </div>

      {/* DROPDOWN */}
      <div className="dropdown-content mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-4 space-y-3">
          {role === "admin" ? (
            <>
              {/* ADMIN UI */}
              <h3 className="font-bold text-lg text-primary">
                {orderCount} Orders
              </h3>

              <p className="text-sm text-gray-500">
                {orderCount} orders waiting for approval
              </p>

              <div className="border-t pt-3">
                <Link to="/dashboard/manage-orders">
                  <button className="btn btn-primary w-full rounded-lg">
                    Manage Orders
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* 🌱USER UI */}
              <h3 className="font-bold text-lg text-primary">
                {wishlistCount} Plants
              </h3>

              <p className="text-sm text-gray-500">
                You have {wishlistCount} plants in wishlist 🌱
              </p>

              <div className="border-t pt-3">
                <Link to="/wishPlants">
                  <button className="btn btn-primary w-full rounded-lg">
                    View Wishlist
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
