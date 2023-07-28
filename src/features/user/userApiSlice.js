import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/permission",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/permission/create",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/roles/create",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data.role;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auth/roles",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updatePermissionStatus = createAsyncThunk(
  "user/updatePermissionStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/permission/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/permission/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
