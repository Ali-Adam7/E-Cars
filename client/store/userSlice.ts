"use client";

import { createSlice } from "@reduxjs/toolkit";
const initial: User = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initial,
  reducers: {
    logIn: (state, action): User => (state = action.payload),
    logOut: (state) => (state = initial),
  },
});
export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
