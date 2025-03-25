import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, { rejectWithValue }) => { // Removed unused parameter
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/getUserOrders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            console.error(err.response);
            return rejectWithValue(err.response.data); // Return error data
        }
    }
);

// Async Thunk to fetch orders details by id
export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (id, { rejectWithValue }) => { // Removed unnecessary destructuring
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/getOrderById/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );

         
            return response.data;
        } catch (err) {
            console.error(err.response);
            return rejectWithValue(err.response.data);
        }
    }
);

// Order slice
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales:0,
        orderDetails: null,
        loading: false,
        error: null // Changed to null for consistency
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders; // Only store the orders array
                state.totalOrders = action.payload.orders.length; // Update totalOrders
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload.orders; // Store single order in orderDetails
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch order details";
            });
    }
});

export default orderSlice.reducer;