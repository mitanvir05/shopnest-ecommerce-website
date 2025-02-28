import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!stats) return <div>Failder to load stats</div>;
  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p>Hi ! {user?.username}, Welcome to the Dashboard</p>
        <AdminStats stats={stats}/>
        <AdminStatsChart stats={stats}/>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
