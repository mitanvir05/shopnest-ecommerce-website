import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if the product already exists in the cart
      const exists = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!exists) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Item already added");
      }

      // Update the cart details
      state.selectedItems = calculateSelectedItems(state);
      state.totalPrice = calculateTotalPrice(state);
      state.tax = calculateTax(state);
      state.grandTotal = calculateGrandTotal(state);
    },
  },
});

// Utility functions
export const calculateSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const calculateTotalPrice = (state) =>
  state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

export const calculateTax = (state) => calculateTotalPrice(state) * state.taxRate;

export const calculateGrandTotal = (state) =>
  calculateTotalPrice(state) + calculateTax(state);

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
