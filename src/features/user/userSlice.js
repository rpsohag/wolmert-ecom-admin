import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  deletePermission,
  getAllPermission,
} from "./userApiSlice";

// create user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permissions: null,
    role: null,
    user: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permissions = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permissions.push(action.payload.permission);
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permissions = state.permissions.filter(
          (data) => data._id != action.payload.permission._id
        );
      });
  },
});

// export selector
export const getAllPermissionData = (state) => state.user;

// export actions
export const { setMessageEmpty } = userSlice.actions;

export default userSlice.reducer;
