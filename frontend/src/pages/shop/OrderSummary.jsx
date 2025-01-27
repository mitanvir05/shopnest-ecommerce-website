import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { clearCart } from "../../redux/features/cart/cartSlice";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p className="text-text-dark">Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
        <div className="px-4 mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Clear Cart</span> <MdDelete size={18} />
          </button>
          <button className="bg-green-700 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Proceed Checkout</span>
            <FaMoneyCheckDollar size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
