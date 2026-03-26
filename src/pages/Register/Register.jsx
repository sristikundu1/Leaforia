import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiUnlock } from "react-icons/fi";
import { MdAttachFile, MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";

const Register = () => {
  const navigate = useNavigate();

  const { registerUser, setUser, updateUser, googleLogin } = use(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    registerUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateUser({
          ...user,
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");

            // reset form
            e.target.reset();

            // show alert
            toast.success("Wow, You successfully Register in this site", {
              icon: "🌳",
              style: {
                borderRadius: "10px",
                background: "#034e3b",
                color: "#fff",
              },
            });
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // setError(errorMessage)
        toast.error(errorMessage);
      });
  };

  //   google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        result.user;

        navigate("/");

        // show alert
        toast.success("Thank you, You successfully Login", {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#034e3b",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        setError(error);
      });
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
          <button
            onClick={handleGoogleLogin}
            className="btn bg-transparent border-2 text-primary border-primary"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
