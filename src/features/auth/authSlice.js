import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  forgetPassword,
  getLoggedInUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateAuthPassword,
  updateAuthProfile,
} from "./authApiSlice";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateAuthProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAuthProfile.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(updateAuthPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAuthPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

// export selector
export const getAuthData = (state) => state.auth;

// export actions
export const { setMessageEmpty } = authSlice.actions;

export default authSlice.reducer;
