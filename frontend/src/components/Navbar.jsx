import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links link">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/Pages">Pages</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">ShopNest</Link>
        </div>
        {/* logo */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <IoIosSearch />
            </Link>
          </span>
          <span className="hover:text-primary">
            <button onClick={handleCartToggle}>
              <FaShoppingBag />
            </button>
            <sup className="text-xs inline-block px-1 text-white rounded-full bg-primary text-center">
              {products.length}
            </sup>
          </span>
          <span>
            <Link to="/login">
              <FaUser />
            </Link>
          </span>
        </div>
      </nav>

      {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>}
    </header>
  );
};

export default Navbar;
