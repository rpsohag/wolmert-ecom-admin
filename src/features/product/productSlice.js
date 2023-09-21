import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createTag,
  deleteBrand,
  deleteTag,
  getAllBrand,
  getAllTags,
  updateBrand,
  updateBrandStatus,
  updateTag,
  updateTagStatus,
} from "./productApiSlice";

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
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (item) => item._id !== action.payload.brand._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateBrandStatus.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateBrandStatus.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id == action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllTags.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.tag = action.payload.tags;
        state.loader = false;
      })
      .addCase(createTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tag = state.tag.filter(
          (item) => item._id !== action.payload.tag._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateTagStatus.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateTagStatus.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateTagStatus.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateTag.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id == action.payload.tag._id)
        ] = action.payload.tag;
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
