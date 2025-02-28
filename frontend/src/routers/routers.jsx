import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDashboardMain from "../pages/dashboard/user/dashboard/userDashboardMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserPayments from "../pages/dashboard/user/UserPayments";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDashboardMain from "../pages/dashboard/admin/dashboard/AdminDashboardMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";
import NotFound from "../components/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // dashboard routes stats
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //users routes
      {
        path: "",
        element: <UserDashboardMain/>,
      },
      {
        path: "orders",
        element: <UserOrders/>,
      },
      {
        path: "payments",
        element: <UserPayments/>,
      },
      {
        path: "profile",
        element: <UserProfile/>,
      },
      {
        path: "reviews",
        element: <UserReviews/>,
      },

      //admin routes
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
           <AdminDashboardMain/>
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: <AddProduct/>,
      },
      {
        path: "manage-products",
        element: <ManageProduct/>,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct/>,
      },
      {
        path: "users",
        element: <ManageUser/>,
      },
      {
        path: "manage-orders",
        element: <ManageOrders/>,
      },

      //Others routes
      {
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);
export default router;
