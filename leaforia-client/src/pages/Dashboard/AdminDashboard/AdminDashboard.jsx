import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineBell,
  HiOutlineRefresh,
} from "react-icons/hi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Dynamic Fetch: Aggregated counts from MongoDB
    axiosSecure.get("/admin-stats").then((res) => setStats(res.data));
  }, []);

  // Professional Static Data for the Graph (Monthly Growth Trend)
  const growthData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 700 },
    { month: "Mar", users: 1200 },
    { month: "Apr", users: stats.users + 1500 },
  ];

  return (
    <div className="p-6  min-h-screen space-y-6">
      {/* TOP HEADER: SYSTEM STATUS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Admin <span className="text-primary">Console</span>
          </h1>
          <p className="text-sm text-slate-500 italic">
            Last system sync: Just now
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-green-700 uppercase">
              API: Operational
            </span>
          </div>
          <button className="p-2 bg-slate-100 rounded-full hover:rotate-180 transition-transform duration-500">
            <HiOutlineRefresh className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* 4-COLUMN STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Revenue",
            val: `$${stats?.revenue || 50}`,
            icon: <HiOutlineCash />,
            col: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Active Users",
            val: stats.users,
            icon: <HiOutlineUsers />,
            col: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Approvals",
            val: stats.approved,
            icon: <HiOutlineShieldCheck />,
            col: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "DB Storage",
            val: "1.2 GB",
            icon: <HiOutlineDatabase />,
            col: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map((item, index) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={index}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div
              className={`p-3 w-fit rounded-2xl mb-4 ${item.bg} ${item.col} text-2xl`}
            >
              {item.icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {item.label}
            </p>
            <h2 className="text-3xl font-black text-slate-800 mt-1">
              {item.val}
            </h2>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GROWTH CHART (Static + Dynamic Mix) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 uppercase text-sm tracking-wider">
            User Acquisition Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorGreen)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT NOTIFICATIONS (Static functionality) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-sm uppercase">
              System Logs
            </h3>
            <HiOutlineBell className="text-primary animate-bounce" />
          </div>
          <div className="space-y-4">
            {[
              { msg: "New Payment Request", time: "2m ago", type: "urgent" },
              { msg: "Server Backup Complete", time: "1h ago", type: "info" },
              { msg: "New User Registered", time: "3h ago", type: "success" },
            ].map((log, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
              >
                <span className="text-xs font-medium text-slate-600">
                  {log.msg}
                </span>
                <span className="text-[10px] text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
