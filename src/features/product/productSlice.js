import { createSlice } from "@reduxjs/toolkit";
import { createBrand, getAllBrand } from "./productApiSlice";

// create user slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    brand: null,
    tag: null,
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brand = action.payload.brands;
        state.loader = false;
      })
      .addCase(createBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      });
  },
});

// export selector
export const getAllPermissionData = (state) => state.user;

// export actions
export const { setMessageEmpty } = productSlice.actions;

export default productSlice.reducer;
