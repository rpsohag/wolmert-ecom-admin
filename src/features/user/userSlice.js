import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRole,
  createUser,
  deletePermission,
  deleteRole,
  getAllPermission,
  getAllRoles,
  getAllUser,
  updatePermissionStatus,
  updateRole,
  updateRoleStatus,
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
        state.permissions = state.permissions ?? [];
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
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = state.role.filter(
          (data) => data._id != action.payload.role._id
        );
      })
      .addCase(updatePermissionStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permissions[
          state.permissions.findIndex(
            (data) => data._id === action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id === action.payload.role._id)
        ] = action.payload.role;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = action.payload;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role = state.role
          ? [...state.role, action.payload]
          : [action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = state.user
          ? [...state.user, action.payload.user]
          : [action.payload.user];
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
      });
  },
});

// export selector
export const getAllPermissionData = (state) => state.user;

// export actions
export const { setMessageEmpty } = userSlice.actions;

export default userSlice.reducer;
