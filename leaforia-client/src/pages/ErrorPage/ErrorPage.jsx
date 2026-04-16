import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowLeft, HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router";
import cancelAnimation from "../../assets/Error.json";
const ErrorPage = () => {
  //   const animationUrl =
  // "https://lottie.host/8254c000-0c4d-48d1-949f-1d22790938a1/WqXvT0R0W0.json";
  const LottieComponent = Lottie.default || Lottie;
  return (
    <div className="min-h-screen bg-[#F9FBFA] flex flex-col items-center justify-center p-6 text-center">
      {/* 1. LOTTIE ICON */}
      <div className="w-64 h-64 md:w-80 md:h-80 mb-8">
        <LottieComponent animationData={cancelAnimation} loop={true} />
      </div>

      {/* 2. HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-slate-800"
      >
        Oops! Lost in <span className="text-primary">Leaforia?</span>
      </motion.h1>

      {/* 3. SUBHEADING */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 mt-4 max-w-md mx-auto text-lg leading-relaxed"
      >
        The page you are looking for has been moved or pruned. Let's get you
        back to the sunlight.
      </motion.p>

      {/* 4. HOME BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <Link
          to="/"
          className="btn btn-primary text-white px-10 rounded-2xl border-none shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          Back to the Garden
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
