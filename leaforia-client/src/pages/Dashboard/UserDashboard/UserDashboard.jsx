import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineLightningBolt,
  HiOutlineBadgeCheck,
  HiOutlineTrendingUp,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

import { AuthContext } from "./../../../contexts/AuthContext";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { getFavPlants } from "../../../utils/localStorage";
import { Link } from "react-router";

const UserDashboard = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    purchaseCount: 0,
    totalSpent: 0,
    userLevel: "Seedling",
  });
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch Stats from DB
        const res = await axiosSecure.get(`/user-stats/${user?.email}`);
        setStats(res.data);

        // 2. Fetch Wishlist
        const localData = getFavPlants() || [];
        setWishlistCount(localData.length);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchDashboardData();
  }, [user?.email, axiosSecure]);

  const purchasesToNextLevel =
    stats.purchaseCount < 5 ? 5 - stats.purchaseCount : 0;

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8  min-h-screen font-sans">
      {/* SECTION 1: PERSONALIZED HERO BANNER (Dynamic) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 md:p-12 bg-secondary rounded-[40px] text-white shadow-2xl overflow-hidden"
      >
        <div className="relative z-10">
          <span className="px-4 py-1 bg-[#dad7cd]/20 border border-[#dad7cd]/30 rounded-full text-[10px] font-black uppercase tracking-widest text-[#dad7cd]">
            Account Status: Active
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4">
            Welcome,{" "}
            <span className="text-primary">
              {user?.displayName?.split(" ")[0]}!
            </span>
          </h1>
          <p className="mt-2 text-slate-300 max-w-md">
            You've spent{" "}
            <strong>${stats.totalSpent?.toLocaleString() || 0}</strong> on your
            botanical journey.
            {purchasesToNextLevel > 0 ? (
              <>
                Complete {purchasesToNextLevel} more purchases to reach{" "}
                <strong>Pro Gardener</strong>.
              </>
            ) : (
              <>
                You have achieved the highest <strong>Pro Gardener</strong>{" "}
                status!
              </>
            )}
          </p>
          <div className="mt-8 flex gap-4">
            <button className="btn btn-primary btn-sm md:btn-md rounded-xl border-none text-white font-bold">
              Marketplace
            </button>
            <Link to={"order-tracking"}>
              <button className="btn btn-ghost btn-sm md:btn-md rounded-xl border hover:text-primary border-slate-700 text-slate-300">
                View Orders
              </button>
            </Link>
          </div>
        </div>
        <HiOutlineBadgeCheck className="absolute -right-10 -bottom-10 text-white/5 text-[280px] rotate-12" />
      </motion.div>

      {/* SECTION 2: THE KPI GRID (Dynamic + LocalStorage) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary transition-all">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Purchased Items
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {stats.purchaseCount || 0}
            </h3>
          </div>
          <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white rounded-2xl transition-all text-2xl">
            <HiOutlineShoppingBag />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-rose-400 transition-all">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Wishlist items
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {wishlistCount}
            </h3>
          </div>
          <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-rose-500 group-hover:text-white rounded-2xl transition-all text-2xl">
            <HiOutlineHeart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-400 transition-all">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Current Rank
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {stats.userLevel}
            </h3>
          </div>
          <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-blue-500 group-hover:text-white rounded-2xl transition-all text-2xl">
            <HiOutlineTrendingUp />
          </div>
        </div>
      </div>

      {/* SECTION 3: COMMUNITY & INSIGHTS (Static Professional Flavor) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Interactive Progress (Mixed Data) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">
              Growth Progress
            </h3>
            <HiOutlineLightningBolt className="text-yellow-500 animate-pulse" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 uppercase">
                <span className="text-slate-500 tracking-tighter">
                  Experience Points
                </span>
                <span className="text-primary">750 / 1000 XP</span>
              </div>
              <progress
                className="progress progress-primary w-full h-3"
                value="75"
                max="100"
              ></progress>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Community Rank", val: "#142" },
                { label: "Badges Earned", val: "4" },
                { label: "Hours Online", val: "12h" },
                { label: "Connections", val: "18" },
              ].map((box, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-4 rounded-2xl text-center"
                >
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {box.label}
                  </p>
                  <p className="text-lg font-black text-slate-800">{box.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Global Market Stats (Static) */}
        <div className="bg-primary text-white p-8 rounded-[35px] shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div>
            <HiOutlineGlobeAlt className="text-4xl mb-4 opacity-50" />
            <h3 className="text-xl font-black leading-tight">
              Global Botanical Community
            </h3>
            <p className="text-white/70 text-sm mt-2">
              Our network just surpassed 120,000 members worldwide. You are in
              the top 15% of active contributors!
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                <div className="avatar border-none w-8">
                  <img src="https://i.pravatar.cc/100?u=1" alt="user" />
                </div>
                <div className="avatar border-none w-8">
                  <img src="https://i.pravatar.cc/100?u=2" alt="user" />
                </div>
                <div className="avatar border-none w-8">
                  <img src="https://i.pravatar.cc/100?u=3" alt="user" />
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                + 42 others online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
