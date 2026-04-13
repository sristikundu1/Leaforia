import React from "react";
import { FaLeaf } from "react-icons/fa";
import plantAnimation from "../../../assets/plant.json";
import Lottie from "lottie-react";

const Newsletter = () => {
  return (
    <div className="bg-base-100 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Animation */}
        <div className="flex justify-center">
          <Lottie.default
            animationData={plantAnimation}
            loop={true}
            className="w-80"
          />
        </div>

        {/* RIGHT: Content */}
        <div className="text-center md:text-left">
          <div className="text-primary flex justify-center md:justify-start mb-4">
            <FaLeaf size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-accent">
            Join Our Plant Community 🌱
          </h2>

          <p className="mt-4 text-base-content/70">
            Get weekly plant care tips, watering guides, and exclusive indoor
            plant deals directly in your inbox.
          </p>

          {/* Input */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />

            <button className="btn bg-primary text-white">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
