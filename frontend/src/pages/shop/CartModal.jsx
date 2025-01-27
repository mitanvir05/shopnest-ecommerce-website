/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../redux/features/cart/cartSlice";

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type, _id) => {
    dispatch(updateQuantity({ type, _id }));
  };

  const handleRemove = (_id) => {
    dispatch(removeItem({ _id }));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-70 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transition: "300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={onClose}
              aria-label="Close Cart"
              className="hover:text-gray-500 bg-black text-white rounded-full p-2"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Cart Details */}
          <div>
            {products.length === 0 ? (
              <div className="text-center text-gray-600">Your Cart Is Empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md p-4 mb-4"
                >
                  <div className="flex items-center">
                    <span className="mr-4 px-2 bg-primary text-white rounded-full">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <img
                      className="w-12 h-12 object-cover mr-4"
                      src={item.image || "default-image.jpg"}
                      alt={item.name || "Product"}
                    />
                    <div>
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0">
                    <button
                      onClick={() => handleQuantity("decrement", item._id)}
                      aria-label="Decrease Quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity("increment", item._id)}
                      aria-label="Increase Quantity"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      aria-label="Remove Item"
                      className="ml-4 text-red-500 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
