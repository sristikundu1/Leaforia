import React, { use, useState } from "react";
import toast from "react-hot-toast/headless";
import { FcGoogle } from "react-icons/fc";
import { FiUnlock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loginUser, setUser } = use(AuthContext);

  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // show alert
        toast.success("Thank you, You successfully Login", {
          icon: "🎉",
          style: {
            borderRadius: "10px",
            background: "#034e3b",
            color: "#fff",
          },
        });

        navigate(`${location.state ? location.state : "/"}`);
        setUser(user);
      })
      .catch((error) => {
        setError(error);
      });

    // reset form
    e.target.reset();
  };

  return (
    <div className="max-w-10/12 mx-auto">
      <div className=" text-center my-10">
        <h2 className="font-bold text-4xl text-primary mb-4">Login</h2>
        <p className="font-medium text-lg text-secondary ">
          Log in to your account to manage your plants and explore more
          features.
        </p>
      </div>

      <div>
        <div className="shrink-0  flex flex-col justify-center items-center pb-10">
          <form onSubmit={handleLogin} className="fieldset gap-5">
            {/* email  */}
            <label className="input validator w-[450px]">
              <MdOutlineEmail />
              <input type="email" name="email" required placeholder="Email" />
            </label>

            {/* Password  */}
            <label className="input validator w-[450px]">
              <FiUnlock />
              <input
                type="password"
                name="password"
                required
                placeholder="password"
              />
            </label>

            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </form>

          <div className="flex justify-between items-center gap-14 mt-4">
            <p className="font-medium text-sm text-secondary ">
              Don't have an account?
              <Link to={"/auth/register"}>
                <span className="hover:text-primary pl-2">Register</span>
              </Link>
            </p>

            <p className="font-medium text-sm text-secondary ">
              Forgot your Password?
            </p>
          </div>

          <div className="divider my-10 w-1/2 mx-auto">OR</div>

          {/* Google */}
          <button className="btn bg-transparent border-2 text-primary border-primary">
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
