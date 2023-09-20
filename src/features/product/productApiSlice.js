import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all brand
export const getAllBrand = createAsyncThunk("product/getAllBrand", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/brand/brands",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/brand/brands/create",
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

export const updateBrandStatus = createAsyncThunk(
  "product/updateBrandStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/brand/brands/status/${id}`,
        { status: status },
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

export const deleteBrand = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/brand/brands/${id}`,

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
