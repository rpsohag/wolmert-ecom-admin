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
export const updateBrand = createAsyncThunk(
  "product/updateBrand",
  async ({ id, data }) => {
    // Accept an object with id and data properties
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/brand/brands/${id}`, // Use id from the argument
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

// get all brand
export const getAllTags = createAsyncThunk("product/getAllTags", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/tag/tags", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createTag = createAsyncThunk("product/createTag", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/tag/tags/create",
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

export const updateTagStatus = createAsyncThunk(
  "product/updateTagStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/tag/tags/status/${id}`,
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
export const updateTag = createAsyncThunk(
  "product/updateTag",
  async ({ id, data }) => {
    // Accept an object with id and data properties
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/tag/tags/${id}`, // Use id from the argument
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

export const deleteTag = createAsyncThunk("product/deleteTag", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/tag/tags/${id}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// get all brand
export const getProductCategories = createAsyncThunk(
  "product/getProductCategories",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/category/categories",
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
export const createCategory = createAsyncThunk(
  "product/createCategory",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/category/categories/create",
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

export const updateCategoryStatus = createAsyncThunk(
  "product/updateCategoryStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/category/categories/status/${id}`,
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
export const updateCategory = createAsyncThunk(
  "product/updateCategory",
  async ({ id, data }) => {
    // Accept an object with id and data properties
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/category/categories/${id}`, // Use id from the argument
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

export const deleteCategory = createAsyncThunk(
  "product/deleteCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/category/categories/${id}`,

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
