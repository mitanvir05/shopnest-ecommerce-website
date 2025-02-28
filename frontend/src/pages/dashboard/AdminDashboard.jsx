import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/add-product", label: "Add Product" },
  { path: "/dashboard/manage-products", label: "Manage Products" },
  { path: "/dashboard/manage-orders", label: "Manage Orders" },
  { path: "/dashboard/users", label: "All Users" },
];

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await Swal.fire({
        title: "Are you sure?",
        text: "You are about to log out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await logoutUser().unwrap();
          dispatch(logout());
          Swal.fire(
            "Logged Out",
            "You have been logged out successfully.",
            "success"
          );
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="nav__logo">
          <Link to="/">ShopNest</Link>
          <p className="text-xs italic">Admin Dashboard</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-black"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogOut}
          className="text-white bg-primary font-medium px-5 py-1 rounded-sm"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
