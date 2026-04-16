import React, { use } from "react";
import Loading from "../components/Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../components/Forbidden/Forbidden";
import { AuthContext } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
