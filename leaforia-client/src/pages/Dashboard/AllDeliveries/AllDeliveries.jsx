import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/deliveries").then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-primary uppercase">
        Delivery Archives
      </h2>
      <div className="overflow-hidden rounded-2xl border border-gray-100">
        <table className="table w-full bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th>Date</th>
              <th>Plant</th>
              <th>Earings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b last:border-0">
                <td className="text-gray-400 text-xs">
                  {new Date(item.paidAt).toLocaleDateString()}
                </td>
                <td className="font-medium">{item.plantName}</td>
                <td className="text-green-600 font-bold">${item.amount}</td>
                <td>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold">
                    Delivered
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllDeliveries;
