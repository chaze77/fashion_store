import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
  },
});

export const { setProductsList } = productsSlice.actions;

export default productsSlice.reducer;
