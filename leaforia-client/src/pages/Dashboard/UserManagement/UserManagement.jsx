import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaUsersCog } from "react-icons/fa";
import { TbUsersMinus } from "react-icons/tb";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(users);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-primary font-montserrat uppercase tracking-wider">
          User Management
        </h1>
        <p className="text-secondary text-sm">
          Total {users.length} Members using this site.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>User Info</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="hover:bg-secondary/20" key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle  h-24 w-24 min-w-24 min-h-24 object-cover  shrink-0">
                      <img src={user?.photo} alt="User Profile" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-primary">
                    {user.displayname}
                  </div>
                  <div> {user.email}</div>
                </td>
                <td>{user.role}</td>
                <td>
                  {" "}
                  {user?.createdAt &&
                    (() => {
                      const date = new Date(user.createdAt);
                      const now = new Date();
                      const diff = Math.floor((now - date) / 1000);

                      const minutes = Math.floor(diff / 60);
                      const hours = Math.floor(diff / 3600);
                      const days = Math.floor(diff / 86400);

                      let relative = "just now";
                      if (minutes >= 1 && minutes < 60)
                        relative = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                      else if (hours >= 1 && hours < 24)
                        relative = `${hours} hour${hours > 1 ? "s" : ""} ago`;
                      else if (days >= 1)
                        relative = `${days} day${days > 1 ? "s" : ""} ago`;

                      return (
                        <>
                          {date.toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}{" "}
                          ({relative})
                        </>
                      );
                    })()}
                </td>

                <th className="space-x-3">
                  <Link
                    to={`/dashboard/edit-plant/${user._id}`}
                    state={{ user }}
                    className="btn btn-ghost btn-xs bg-secondary text-white hover:bg-primary hover:text-white p-4"
                  >
                    <FaUsersCog size={20} />
                  </Link>
                  <button
                    onClick={() => handleDeletePlant(user._id)}
                    className="btn btn-ghost btn-xs bg-secondary text-white hover:bg-primary hover:text-white p-4"
                  >
                    <TbUsersMinus size={20} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
