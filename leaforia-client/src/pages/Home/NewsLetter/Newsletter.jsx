import React, { useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import plantAnimation from "../../../assets/plant.json";
import Lottie from "lottie-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) return;

    setLoading(true);

    const serviceID = import.meta.env.VITE_serviceID;
    const templateID = import.meta.env.VITE_templateID;
    const publicKey = import.meta.env.VITE_publicKey;

    const templateParams = {
      user_email: email,
      message:
        "Welcome to our botanical family! You've successfully subscribed.",
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setLoading(false);
        // Professional Success Feedback
        toast.success("Subscribed!Check your inbox for a welcome message.");
        emailRef.current.value = ""; // Clear input
      })
      .catch((err) => {
        setLoading(false);
        console.error("Email Error:", err);
      });
  };
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
          <div className="mt-6 ">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />

              <button
                disabled={loading}
                className="btn bg-primary hover:bg-primary-focus text-white border-none min-w-[120px]"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
