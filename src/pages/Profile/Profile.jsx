import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  const { user } = use(AuthContext);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center gap-2 my-5 ">
        <img
          className="w-90 h-96 object-cover rounded-lg"
          src={user?.photoURL}
          alt="useName"
        />
        <p className="text-primary font-bold text-xl">{user?.displayName}</p>
        <p className="text-primary font-bold text-xl">{user?.email}</p>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Profile;
