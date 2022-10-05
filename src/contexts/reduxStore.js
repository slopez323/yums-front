import { configureStore } from "@reduxjs/toolkit";
import { otherImageSlice } from "./otherImageSlice";

const reduxStore = configureStore({
  reducer: {
    otherImages: otherImageSlice.reducer,
  },
});

export default reduxStore;
