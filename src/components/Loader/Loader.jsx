// import Lottie from "lottie-react";
import React from "react";
// import loadingAnimation from "../../assets/loading.json";
import gifimage from "../../assets/plant.gif";
const Loader = () => {
  //   const animationData = loadingAnimation?.default || loadingAnimation;
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-40">
        <img src={gifimage} alt="" />
        {/* <Lottie animationData={animationData} loop={true} /> */}
      </div>
    </div>
  );
};

export default Loader;
