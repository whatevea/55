import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";
import { CartSlice } from "../reducers/cartSlice";

export const store = configureStore({
  reducer: {
    User: userSlice,
    Cart: CartSlice.reducer,
  },
});
