import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router"; // Fixed import
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiOutlineCheckBadge, HiOutlineClock } from "react-icons/hi2";
import Loading from "../../../components/Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .finally(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineCheckBadge className="text-5xl" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Payment Received!
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto mb-8">
          Thank you for your purchase. Your payment was processed successfully
          and your plants are reserved.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard/order-tracking")}
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-lg transition-all"
          >
            Track My Order
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-500 hover:text-primary font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
