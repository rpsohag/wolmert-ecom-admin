// register user

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.01:5000/api/v1/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
