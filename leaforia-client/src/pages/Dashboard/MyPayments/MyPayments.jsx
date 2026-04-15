import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPayments = () => {
  const { user } = use(AuthContext); // Your context to get email
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-payments?email=${user.email}`)
        .then((res) => setPayments(res.data));
    }
  }, [user]);

  console.log(payments);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">My Garden Purchases</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500">No completed purchases yet</p>
      ) : (
        payments.map((pay) => (
          <div
            key={pay._id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-hover hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-primary font-bold">
                🌿
              </div>
              <div>
                <h4 className="font-bold text-gray-700">{pay.plantName}</h4>
                <p className="text-xs text-gray-400">
                  Transaction ID: {pay.transactionId.slice(-8)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">${pay.amount}</div>
              <div
                className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                  pay.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {pay.status}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPayments;
