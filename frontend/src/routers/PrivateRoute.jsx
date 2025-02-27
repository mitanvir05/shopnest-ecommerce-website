import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You are not authorized to access this page. Please login.",
      confirmButtonColor: "#d33",
    });

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    Swal.fire({
      icon: "warning",
      title: "Access Restricted",
      text: "You do not have the required permissions to view this page.",
      confirmButtonColor: "#f39c12",
    });

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
