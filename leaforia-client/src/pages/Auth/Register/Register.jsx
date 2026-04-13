import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { FiUnlock } from "react-icons/fi";
import { MdAttachFile, MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";

import { AuthContext } from "./../../../contexts/AuthContext";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, setUser, updateUser } = use(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    try {
      // 1. Create User in Firebase
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      // 2. Update Firebase Profile (Display Name & Photo)
      await updateUser({
        displayName: name,
        photoURL: photo,
      });

      // 3. Prepare data for MongoDB
      const newUser = {
        name,
        email,
        photo,
        createdAt: new Date(),
      };

      // 4. Save to Database
      const res = await axiosSecure.post("/users", newUser);

      if (res.data.insertedId) {
        // Sync local state with the new profile info
        setUser({ ...user, displayName: name, photoURL: photo });

        toast.success("Registration Successful 🌿", {
          icon: "🌱",
          style: {
            borderRadius: "10px",
            background: "#034e3b",
            color: "#fff",
          },
        });

        form.reset();
        navigate("/");
      } else {
        // handle existing user
        toast("User already exists, please login 🌱");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.message;

      // Friendly Firebase error formatting
      if (errorMessage.includes("auth/email-already-in-use")) {
        toast.error("This email is already registered.");
      } else {
        toast.error(errorMessage);
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-10/12 mx-auto">
      <div className=" text-center my-10">
        <h2 className="font-bold text-4xl text-primary mb-4">Register</h2>
        <p className="font-medium text-lg text-secondary ">
          Register to start your green journey and keep track of your plants.
        </p>
      </div>

      <div>
        <div className="shrink-0  flex flex-col justify-center items-center pb-10">
          <form onSubmit={handleRegister} className="fieldset gap-5">
            {/* name  */}
            <label className="input validator w-96 md:w-[450px]">
              <FaRegUser />
              <input type="text" name="name" required placeholder="Username" />
            </label>

            {/* email  */}
            <label className="input validator w-96 md:w-[450px]">
              <MdOutlineEmail />
              <input type="email" name="email" required placeholder="Email" />
            </label>

            {/* photo  */}
            <label className="input validator w-96 md:w-[450px]">
              <MdAttachFile />
              <input type="text" name="photo" required placeholder="PhotoURL" />
            </label>

            {/* Password  */}
            <label className="input validator w-96 md:w-[450px]">
              <FiUnlock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="password"
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <VscEyeClosed />}
              </span>
            </label>

            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="font-medium text-sm text-secondary ">
              Don't have an account?
              <Link to={"/auth/login"}>
                <span className="hover:text-primary pl-2">Login</span>
              </Link>
            </p>
          </div>

          {/* show error  */}
          <div className="text-center mt-4">
            {error && (
              <p className="text-red-800 font-semibold text-sm">{error}</p>
            )}
          </div>

          <div className="divider my-10 w-1/2 mx-auto">OR</div>

          {/* Google */}
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
