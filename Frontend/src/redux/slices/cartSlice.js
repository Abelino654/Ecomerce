import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Helper function to load cart from local storage
const loadCartFromStorage = () => {
    const storedCard = localStorage.getItem("cart");
    return storedCard ? JSON.parse(storedCard) : { products: [] }
}

// Helper functions to store cart to local storage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))

}

// Get cart for user or guest
export const fetchCart = createAsyncThunk("carts/fetchCarts", async ({ userId, guestId }, { rejectWithValue }) => {
    try {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`);
        return response.data
    } catch (error) {
        console.error(error)
        return rejectWithValue(error);
    }
})



// Add product to cart
export const addProductToCart = createAsyncThunk("cart/addProduct", async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {

    try {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/addCart`, { productId, quantity, size, color, guestId, userId });

        return response.data;
    } catch (err) {
        console.error(err);
        return rejectWithValue(err.message);

    }
})


// Update cart quantity 
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {

    try {

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart`, {
            productId,
            quantity,
            guestId,
            userId,
            size,
            color
        })
        return response.data
    } catch (err) {
        console.error(err);
        return rejectWithValue(err.response)

    }

})



// Remove an item from cart
export const removeItemFromCart = createAsyncThunk("cart/removeItemFromCart", async ({
    productId, guestId, userId, size, color
}, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/deleteCartItem`,
            data: { productId, guestId, userId, size, color }
        })

        return response.data
    } catch (err) {
        console.error(err);
        return rejectWithValue(err);
    }
})

// Merge carts
export const mergeCarts = createAsyncThunk("cart/mergeCarts", async ({ guestId, user }, { rejectWithValue }) => {
    try {

        const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/mergeCarts`, { guestId, user },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }

        )
        return response.data
    } catch (err) {

        return rejectWithValue(err.response)
    }
})



// Cart Slice

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart")
        }
    },

    // Extra reducers
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message || "Failed to fetch cart"
            })
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message || "Failed to add product to cart"
            })
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message || "Failed to update item quantity"
            })
            .addCase(removeItemFromCart.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message || "Failed to Remove cart "
            })
            .addCase(mergeCarts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(mergeCarts.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(action.payload)
            })
            .addCase(mergeCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.message || "Failed to Merger cart "
            })
    }
})


export const { clearCart } = cartSlice.actions
export default cartSlice.reducer