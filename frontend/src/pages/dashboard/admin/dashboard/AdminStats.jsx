import React from "react";

const AdminStats = ({ stats }) => {
 // console.log(stats);
  return (
    <div className="my-5 space-y-4 ">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-col-2">
        <div
          className="bg-white shadow-md rounded-lg p-6 border
         border-gray-200 hover:scale-105 cursor-pointer transition-all duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Total Earnings</h2>
          <p className="text-2xl font-bold">{stats?.totalEarnings}</p>
        </div>
        <div
          className="bg-white shadow-md rounded-lg p-6 border
         border-gray-200 hover:scale-105 cursor-pointer transition-all duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl font-bold">{stats?.totalOrders}</p>
        </div>
        <div
          className="bg-white shadow-md rounded-lg p-6 border
         border-gray-200 hover:scale-105 cursor-pointer transition-all duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">{stats?.totalUsers}</p>
        </div>
        <div
          className="bg-white shadow-md rounded-lg p-6 border
         border-gray-200 hover:scale-105 cursor-pointer transition-all duration-200"
        >
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold">{stats?.totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
