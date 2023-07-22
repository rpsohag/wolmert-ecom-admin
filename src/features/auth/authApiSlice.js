// register user

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/auth/me", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateAuthProfile = createAsyncThunk(
  "profile/updateAuthProfile",
  async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/auth/update-profile",
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  }
);
export const updateAuthPassword = createAsyncThunk(
  "profile/updateAuthPassword",
  async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/v1/auth/update-password",
        {
          old_password: data.old_password,
          new_password: data.new_password,
        },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
