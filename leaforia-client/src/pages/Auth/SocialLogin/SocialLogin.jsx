import React, { use, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleLogin } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  //   google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        // 1. Prepare data from Google Result
        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user", // Default role
          createdAt: new Date(),
        };

        // 2. Send to Database (Server handles the existence check)
        try {
          await axiosSecure.post("/users", newUser);

          // 3. Success Feedback
          toast.success("Login Successful 🌿", {
            icon: "🎉",
            style: {
              borderRadius: "10px",
              background: "#034e3b",
              color: "#fff",
            },
          });

          navigate("/");
        } catch (dbError) {
          console.error("Database Save Error:", dbError);
        }
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        setError(error.message);
        toast.error("Google Login Failed");
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="btn bg-transparent border-2 text-primary border-primary"
    >
      <FcGoogle className="text-xl" />
      Login with Google
    </button>
  );
};

export default SocialLogin;
