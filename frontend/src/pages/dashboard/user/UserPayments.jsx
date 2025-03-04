import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";
import LoadingSpinner from "../../../utils/LoadingSpinner";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orders, error, isLoading } = useGetOrdersByEmailQuery(user?.email);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle errors
  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-5">
        ⚠ You have no payments yet. {error.message}
      </div>
    );
  }

  // Calculate total payments
  const totalPayment = orders?.reduce((acc, order) => acc + (order?.amount || 0), 0).toFixed(2);

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-500 bg-yellow-100 px-3 py-1 rounded";
      case "processing":
        return "text-blue-500 bg-blue-100 px-3 py-1 rounded";
      case "shipped":
        return "text-purple-500 bg-purple-100 px-3 py-1 rounded";
      case "completed":
        return "text-green-500 bg-green-100 px-3 py-1 rounded";
      default:
        return "text-gray-500 bg-gray-100 px-3 py-1 rounded";
    }
  };

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-100 px-6 py-4">
            <h3 className="text-xl font-semibold text-gray-700">Total Payments</h3>
            <p className="text-lg font-semibold text-indigo-600">Total Spent: ${totalPayment}</p>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Transaction ID</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={order?._id || index} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{order?._id}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {order?.createdAt
                        ? new Date(order.createdAt).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">${order?.amount?.toFixed(2)}</td>
                    <td className="px-6 py-4 text-gray-700">{order?.orderId || "N/A"}</td>
                    <td className={`px-6 py-4 font-semibold ${getStatusColor(order?.status)}`}>
                      {order?.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Payments Message */}
          {orders.length === 0 && (
            <div className="text-center text-gray-500 py-5">
              No payments found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserPayments;
