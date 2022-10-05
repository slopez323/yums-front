import { createSlice } from "@reduxjs/toolkit";

export const otherImageSlice = createSlice({
  name: "otherImages",
  initialState: [],
  reducers: {
    addOtherImage: (state, action) => [...state, action.payload],
  },
});

export const { addOtherImage } = otherImageSlice.actions;
