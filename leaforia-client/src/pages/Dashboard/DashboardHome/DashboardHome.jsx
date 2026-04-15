import React from "react";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";

const DashboardHome = () => {
  const { role, isLoading } = useRole();
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="min-h-screen ">
      {role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default DashboardHome;
