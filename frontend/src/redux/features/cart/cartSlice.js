import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

// Utility functions
const calculateSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

const calculateTotalPrice = (state) =>
  state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

const calculateTax = (state) => calculateTotalPrice(state) * state.taxRate;

const calculateGrandTotal = (state) =>
  calculateTotalPrice(state) + calculateTax(state);

const updateCartSummary = (state) => {
  state.selectedItems = calculateSelectedItems(state);
  state.totalPrice = calculateTotalPrice(state);
  state.tax = calculateTax(state);
  state.grandTotal = calculateGrandTotal(state);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!exists) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      updateCartSummary(state);
    },
    updateQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          if (action.payload.type === "increment") {
            product.quantity++;
          } else if (action.payload.type === "decrement" && product.quantity > 1) {
            product.quantity--;
          }
        }
        return product;
      });
      updateCartSummary(state);
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      updateCartSummary(state);
    },
    clearCart: (state) => {
      state.products = [];
      updateCartSummary(state);
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
