import React, { use, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import { motion } from "framer-motion"; // Make sure to install framer-motion
import {
  HiOutlineMail,
  HiOutlineBadgeCheck,
  HiOutlineUserCircle,
} from "react-icons/hi"; // Install react-icons
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updatePassword } from "firebase/auth";
import { FiUnlock } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";

// Entrance Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Staggers the appearance of children
    },
  },
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Profile = () => {
  const { user, updateUser, setUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  // Define dynamic role styles
  const roleColors = {
    Admin: "bg-red-50 text-red-600 border-red-200",
    User: "bg-green-50 text-green-600 border-green-200",
    Editor: "bg-blue-50 text-blue-600 border-blue-200",
  };

  // Handler 1: Update Profile (Firebase + DB)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await updateUser({ displayName: name, photoURL: photo });
      setUser((prev) => ({ ...prev, displayName: name, photoURL: photo }));

      // Sync with your DB
      await axiosSecure.patch(`/users/${user.email}`, {
        name,
        photo,
      });

      toast.success("Success", "Profile details synchronized!", "success");
      document.getElementById("profile_modal").close();
    } catch (error) {
      toast.error("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handler 2: Update Password Only (Firebase Only)
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPassword = e.target.password.value;

    // Check if user is using Google/Social login
    const isPasswordUser = user.providerData.some(
      (provider) => provider.providerId === "password",
    );

    if (!isPasswordUser) {
      toast.error(
        "Social login users cannot change passwords here. Please use Google settings.",
      );
      setLoading(false);
      return;
    }

    try {
      await updatePassword(user, newPassword);
      toast.success("Security credentials updated!");
      document.getElementById("password_modal").close();
      e.target.reset();
    } catch (error) {
      console.error("Firebase Auth Error:", error.code);

      // Specific error handling for "Eye-Soothing" UX
      if (error.code === "auth/requires-recent-login") {
        toast.error(
          "Please log out and log back in to verify your identity before changing your password.",
        );
      } else if (error.code === "auth/weak-password") {
        toast.error("Your password is too weak. Try 6+ characters.");
      } else {
        // This will show the actual message from Firebase (e.g., Network Error)
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Reusable Page Wrapper
    <div className="min-h-screen bg-[#f7f9f7] pt-28 pb-20 font-montserrat">
      <motion.div
        className="max-w-7xl mx-auto px-4 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Full Page Redesign Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* 🌿 LEFT SIDE: IMMERSIVE PHOTO SECTION */}
          <motion.div
            variants={childVariants}
            className="md:col-span-5 relative group"
          >
            {/* Background Layer (Visual Depth) */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-0"></div>

            {/* Main Photo Card */}
            <div className="relative z-10 p-4 bg-white rounded-3xl shadow-xl border border-gray-100">
              <img
                className="w-full h-[500px] object-cover rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-[1.02]"
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} // Fallback image
                alt={user?.displayName || "User Profile"}
              />
            </div>
          </motion.div>

          {/* 🌿 RIGHT SIDE: USER DETAILS PANEL */}
          <motion.aside
            variants={containerVariants}
            className="md:col-span-7 space-y-8"
          >
            {/* Header Area */}
            <motion.div variants={childVariants} className="mb-10">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">
                Profile Center
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                Your Digital
                <span className="text-primary">Garden Account</span>
              </h1>
            </motion.div>

            {/* Information Cards */}
            <motion.div
              variants={childVariants}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Card 1: Email */}
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-start gap-4 transition-all hover:border-primary/20 hover:shadow-md">
                <div className="p-3 bg-green-50 rounded-xl text-primary flex-shrink-0">
                  <HiOutlineMail size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400">
                    Primary Contact
                  </p>
                  <p className="text-gray-800 font-semibold mt-1 break-words">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Card 2: Role */}
              <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-start gap-4 transition-all hover:border-primary/20 hover:shadow-md">
                <div
                  className={`p-3 rounded-xl border flex-shrink-0 ${roleColors[role] || "bg-gray-50 text-gray-600"}`}
                >
                  <HiOutlineBadgeCheck size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400">
                    Account Access
                  </p>
                  <p
                    className={`font-bold mt-1 text-lg ${roleColors[role] || ""}`}
                  >
                    {role || "Verified User"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Account Actions Section */}
            <motion.div
              variants={childVariants}
              className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiOutlineUserCircle className="text-primary" />
                Account Security & Curation
              </h3>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() =>
                    document.getElementById("profile_modal").showModal()
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg hover:bg-secondary transition-all"
                >
                  Edit Profile
                </motion.button>
                <motion.button
                  onClick={() =>
                    document.getElementById("password_modal").showModal()
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-all"
                >
                  Update Password
                </motion.button>

                {/* --- MODAL 1: PROFILE UPDATE --- */}
                <dialog
                  id="profile_modal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box bg-white rounded-3xl p-8 border border-gray-100">
                    <form onSubmit={handleProfileUpdate}>
                      <h3 className="text-2xl font-black text-slate-800 mb-6">
                        Edit <span className="text-primary">Profile</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="form-control">
                          <label className="label font-bold text-xs uppercase text-gray-400">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            className="input input-bordered bg-gray-50 rounded-xl focus:outline-primary"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label font-bold text-xs uppercase text-gray-400">
                            Photo URL
                          </label>
                          <input
                            type="text"
                            name="photo"
                            defaultValue={user?.photoURL}
                            className="input input-bordered bg-gray-50 rounded-xl focus:outline-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="modal-action mt-8 flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("profile_modal").close()
                          }
                          className="btn btn-ghost rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary flex-1 text-white rounded-xl"
                        >
                          {loading ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                {/* --- MODAL 2: PASSWORD UPDATE --- */}
                <dialog
                  id="password_modal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box bg-white rounded-3xl p-8 border border-gray-100">
                    <form onSubmit={handlePasswordUpdate}>
                      <h3 className="text-2xl font-black text-slate-800 mb-6">
                        Update <span className="text-red-500">Security</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="form-control relative">
                          <label className="label font-bold text-xs uppercase text-gray-400 mr-2 ">
                            New Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="input input-bordered bg-gray-50 rounded-xl focus:outline-red-500"
                            required
                          />
                          <span
                            className="absolute right-10 top-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <IoEyeOutline /> : <VscEyeClosed />}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic mt-2">
                          Note: For security, you might be asked to re-login if
                          you haven't recently.
                        </p>
                      </div>

                      <div className="modal-action mt-8 flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("password_modal").close()
                          }
                          className="btn btn-ghost rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn bg-red-500 hover:bg-red-600 border-none text-white flex-1 rounded-xl"
                        >
                          {loading ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Reset Password"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </motion.div>

            {/* Static Pro Tip Box */}
            <motion.div
              variants={childVariants}
              className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary"
            >
              <h4 className="font-bold text-primary">🌱 Quick Botanical Tip</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Always check your soil's moisture before watering. Stick your
                finger 1–2 inches deep. If it feels dry, it's time to water; if
                it’s damp, wait a few more days!
              </p>
            </motion.div>
          </motion.aside>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
