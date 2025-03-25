import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/createCheckout`,
                checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload.checkout;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;