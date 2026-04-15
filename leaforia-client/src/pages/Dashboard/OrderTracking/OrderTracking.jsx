import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineCheckBadge, HiOutlineClock } from "react-icons/hi2";

const OrderTracking = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/active-order/${user.email}`)
        .then((res) => {
          setPayment(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <Loading />;

  // IF NO ACTIVE "IN PROGRESS" ORDER FOUND
  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No Orders Yet 🌱
          </h2>
          <p className="text-gray-500 mb-6">
            You haven’t placed any plant orders yet, or your previous orders are
            already completed!
          </p>
          <button
            onClick={() => (window.location.href = "/plants")}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90"
          >
            Explore Plants
          </button>
        </div>
      </div>
    );
  }

  // IF "IN PROGRESS" ORDER EXISTS
  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-green-100">
        <HiOutlineCheckBadge className="text-7xl text-primary mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h2>

        <p className="text-gray-500 mb-8">
          Your plants are getting ready for their new home.
        </p>

        <div className="space-y-4 text-left bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Plant Name:</span>

            <span className="font-bold text-primary">{payment?.plantName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Quantity:</span>

            <span className="font-bold">{payment?.quantity}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Transaction ID:</span>

            <span className="text-[10px] font-mono self-center">
              {payment?.transactionId}
            </span>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Payment:</span>

            <span className="badge bg-secondary gap-2 py-3 px-4 text-white">
              Paid
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Delivery:</span>

            <span className="badge badge-warning gap-2 py-3 px-4">
              <HiOutlineClock /> {payment?.status}
            </span>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/dashboard/my-payments")}
          className="mt-8 w-full py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
