import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  const fetchActiveOrders = async () => {
    const res = await axiosSecure.get("/admin/manage-orders"); // Backend: find({status: "In Progress"})
    setOrders(res.data);
  };

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/orders/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      toast.success("Dispatched! 🚚");
      fetchActiveOrders(); // Remove from active list
    }
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-primary uppercase tracking-tight">
        Pending Deliveries
      </h2>
      <table className="table w-full">
        <thead className="bg-gray-50 uppercase text-[10px]">
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Plant</th>
            <th>Price</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                {order.userName} <br />
                <span className="text-[10px] text-gray-400">
                  {order.customer_email}
                </span>
              </td>
              <td className="font-semibold text-secondary">
                {order.plantName} (x{order.quantity})
              </td>
              <td className="font-mono">${order.amount}</td>
              <td className="font-mono">{order.paymentStatus}</td>
              <td>
                <button
                  onClick={() => handleApprove(order._id)}
                  className="btn btn-xs bg-primary rounded-full px-4 text-white"
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="p-20 text-center text-gray-400 italic">
          No orders found in the garden.
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
