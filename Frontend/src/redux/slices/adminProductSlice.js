import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Function to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
    "admin/fetchAdminProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/getAllProducts`, {
                headers: {
                    Authorization: USER_TOKEN
                }
            });
          
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createProduct = createAsyncThunk(
    "admin/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/createProduct`, productData, {
                headers: {
                    Authorization: USER_TOKEN
                }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "admin/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/updateProduct/${id}`, productData, {
                headers: {
                    Authorization: USER_TOKEN
                }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "admin/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/deleteProduct/${id}`, {
                headers: {
                    Authorization: USER_TOKEN
                }
            });
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || action.payload; // Handle different response structures
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch products";
            })
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload); // Add new product to the list
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to create product";
            })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex((prod) => prod._id === updatedProduct._id); // Fixed typo: produts to products
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update product";
            })
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((prod) => prod._id !== action.payload); // Fixed: action.payload is the id
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete product";
            });
    }
});

export default adminProductSlice.reducer;