import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../assets/loading.json";

const Loader = () => {
  const LottieComponent = Lottie.default || Lottie;
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-96">
        <LottieComponent animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
