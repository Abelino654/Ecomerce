import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// Fetch all admin orders
export const fetchAllOrders = createAsyncThunk(
    "admin/fetchAllAdminOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/getAllOrders`, {
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

// Update order delivery
export const updateOrderDelivery = createAsyncThunk(
    "admin/updateOrderDelivery",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/updateOrder/${id}`, { status }, {
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

// Delete order
export const deleteOrder = createAsyncThunk(
    "admin/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/deleteOrder/${id}`, {
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

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        totalOrders: 0,
        orders: [],
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders || action.payload; // Handle different response structures
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            // Update Order Delivery
            .addCase(updateOrderDelivery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderDelivery.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload.updatedOrder;
                const index = state.orders.findIndex((order) => order._id === updatedOrder._id); // Fixed: Use === for comparison
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
            .addCase(updateOrderDelivery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update order";
            })
            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter((order) => order._id !== action.payload); // Fixed: action.payload is the id
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete order";
            });
    }
});

export default adminOrderSlice.reducer;