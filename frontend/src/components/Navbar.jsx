import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingBag, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCartToggle = () => setIsCartOpen(!isCartOpen);
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Add Product", path: "/dashboard/add-product" },
    { label: "Manage Product", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "All Users", path: "/dashboard/users" },
  ];

  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Profile", path: "/dashboard/profile" },
  ];

  const dropDownMenus = user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser().unwrap();
          dispatch(logout());
          navigate("/");
          Swal.fire("Logged Out!", "You have been logged out.", "success");
        } catch (error) {
          Swal.fire("Error", "Logout failed! Try again.", error);
        }
      }
    });
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        {/* Hamburger Menu on Mobile */}
        <div className="block md:hidden">
          <button onClick={handleMenuToggle} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>
          {isMenuOpen && (
            <ul className="absolute bg-white shadow-lg mt-2 py-2 w-40 rounded-lg">
              <li className="p-2 hover:bg-gray-200">
                <Link to="/" onClick={handleMenuToggle}>Home</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link to="/shop" onClick={handleMenuToggle}>Shop</Link>
              </li>
            </ul>
          )}
        </div>
        
        {/* Desktop Navigation */}
        <ul className="nav__links link hidden md:flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>

        {/* Logo - Visible only on medium and large screens */}
        <div className="nav__logo hidden md:block">
          <Link to="/">ShopNest</Link>
        </div>

        {/* Icons Section */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <IoIosSearch size={25} />
            </Link>
          </span>
          <span className="hover:text-primary">
            <button onClick={handleCartToggle}>
              <FaShoppingBag size={20} />
            </button>
            <sup className="text-xs inline-block px-1 text-white rounded-full bg-primary text-center">
              {products.length}
            </sup>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropdownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenus.map((menu) => (
                        <li key={menu.path}>
                          <Link onClick={() => setIsDropdownOpen(false)} className="dropdown-items" to={menu.path}>
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link className="dropdown-items" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaUser />
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;