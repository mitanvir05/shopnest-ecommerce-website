/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import RatingStars from "../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  // Get the current products in the cart from Redux state
  const cart = useSelector((state) => state.cart.products);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      // Show alert if the item is already in the cart
      Swal.fire({
        icon: 'info',
        title: 'Already in cart!',
        text: `The product "${product.name}" is already in your cart. Check your cart for details.`,
      });
    } else {
      // Add item to cart
      dispatch(addToCart(product));

      // Show success alert for the first time the item is added
      Swal.fire({
        icon: 'success',
        title: 'Added to cart!',
        text: `The product "${product.name}" has been added to your cart.`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="products__card">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="hover:block absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <BsCart3 size={25} className="bg-primary p-0.5 text-white hover:bg-primary-dark" />
              </button>
            </div>
          </div>
          {/* product description */}
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
