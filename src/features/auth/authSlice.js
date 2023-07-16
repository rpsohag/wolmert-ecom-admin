import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApiSlice";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
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
      });
  },
});

// export selector
export const { setMessageEmpty } = authSlice.actions;
// export actions

export default authSlice.reducer;
