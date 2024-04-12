import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      console.log("action is", action);
      state.push(action.payload);
      console.log("state in add reducer:", state);
    },
    remove: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { add, remove } = CartSlice.actions;
export const cartSelector = (state) => state.Cart.Cart; // Assuming the slice is mounted at state.Cart
export default CartSlice.reducer;
