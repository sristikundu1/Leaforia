import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiUnlock } from "react-icons/fi";
import { MdAttachFile, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";

const Register = () => {
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
          <form className="fieldset gap-5">
            {/* name  */}
            <label className="input validator w-[450px]">
              <FaRegUser />
              <input type="text" name="name" required placeholder="Username" />
            </label>

            {/* email  */}
            <label className="input validator w-[450px]">
              <MdOutlineEmail />
              <input type="email" name="email" required placeholder="Email" />
            </label>

            {/* photo  */}
            <label className="input validator w-[450px]">
              <MdAttachFile />
              <input type="text" name="photo" required placeholder="PhotoURL" />
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

export default Register;
