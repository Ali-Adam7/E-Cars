"use client";

import { createSlice } from "@reduxjs/toolkit";
import { init } from "next/dist/compiled/webpack/webpack";
const initial: Car[] = [];
const cartrSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    initialize: (state, action) => (state = action.payload),
    addToCart: (state, action) => {
      const carId = action.payload.id;
      const index = state.findIndex((car) => car.id === carId);
      if (index === -1) {
        state.push(action.payload);
      } else if (state[index]?.quantity >= 1) {
        state[index].quantity = state[index].quantity + 1;
      }
    },
    removeFromCart: (state, action) => {
      const carId = action.payload.id;
      const index = state.findIndex((car) => car.id === carId);
      if (state[index].quantity > 1) {
        state[index].quantity = state[index].quantity - 1;
      } else {
        state.splice(index, 1);
      }
    },
    emptyCart: (state) => (state = []),
  },
});
export const { initialize, addToCart, removeFromCart, emptyCart } = cartrSlice.actions;
export default cartrSlice.reducer;
