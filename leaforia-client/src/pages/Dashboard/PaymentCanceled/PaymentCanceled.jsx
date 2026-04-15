import React from "react";
import Lottie from "lottie-react";
import cancelAnimation from "../../../assets/cancel animation.json";
import { Link } from "react-router";

const PaymentCanceled = () => {
  const LottieComponent = Lottie.default || Lottie;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffff0] px-4">
      {/* Lottie Animation */}
      <div className="w-72 md:w-96">
        <LottieComponent animationData={cancelAnimation} loop={true} />
      </div>

      {/* Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-red-500 mt-6">
        Payment Canceled
      </h1>

      <p className="text-gray-600 mt-2 text-center max-w-md">
        Don’t worry 🌱 Your order was not placed. You can continue browsing
        beautiful plants anytime.
      </p>

      {/* Button */}
      <Link
        to="/plants"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Back to Plants
      </Link>
    </div>
  );
};

export default PaymentCanceled;
