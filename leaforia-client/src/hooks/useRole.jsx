import { use, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../contexts/AuthContext";

const useRole = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setRoleLoading(true);

    axiosSecure
      .get(`/users/${user.email}/role`)
      .then((res) => {
        setRole(res.data?.role || "user");
        setRoleLoading(false);
      })
      .catch(() => {
        setRole("user");
        setRoleLoading(false);
      });
  }, [user?.email, axiosSecure]);

  return { role, roleLoading };
};

export default useRole;
