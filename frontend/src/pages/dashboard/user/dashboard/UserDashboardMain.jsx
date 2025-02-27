import React from "react";
import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import LoadingSpinner from "../../../../utils/LoadingSpinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserStats from "./UserStats";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle errors
  if (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500 font-semibold mt-5">
        ⚠ An error occurred while fetching your stats. Please try again later.
      </div>
    );
  }

  // Handle empty stats
  if (!stats) {
    return (
      <div className="text-center text-gray-600 font-semibold mt-5">
        No statistics available for your account.
      </div>
    );
  }

  // Chart Data
  const chartData = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "User Stats",
        data: [stats?.totalPayments, stats?.totalReviews, stats?.totalPurchasedProducts],
        backgroundColor: ["#457B9D", "#803690", "#FFA500"],
        borderColor: "#FFFFFF",
        borderWidth: 1,
        hoverBorderColor: "#fff",
        hoverBorderWidth: 2,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = chartData.labels[tooltipItem.dataIndex];
            return `${label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          borderDash: [8, 4],
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.username}!
        </h1>
        <UserStats stats={stats}/>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        
        <div className="relative w-full h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardMain;
