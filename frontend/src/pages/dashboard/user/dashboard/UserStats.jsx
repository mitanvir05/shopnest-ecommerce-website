import React from "react";

const UserStats = ({ stats }) => {
  return (
    <div>
      <p className="text-gray-600">
        Here's a quick overview of your account activity.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 ml-0">
        <div
          className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary
        duration-200 cursor-pointer hover:scale-105 transition-all "
        >
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">$ {stats?.totalPayments}</p>
        </div>
        <div
          className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary
        duration-200 cursor-pointer hover:scale-105 transition-all "
        >
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-2xl font-bold">{stats?.totalReviews}</p>
        </div>
        <div
          className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary
        duration-200 cursor-pointer hover:scale-105 transition-all "
        >
          <h2 className="text-xl font-semibold mb-2">Total Purchased</h2>
          <p className="text-2xl font-bold">{stats?.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
