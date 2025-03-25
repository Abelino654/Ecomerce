import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";
import adminSlice from "./slices/adminSlice";
import adminProductsSlice from "./slices/adminProductSlice";
import adminOrderSlice from "./slices/adminOrderSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        cart: cartSlice,
        checkout: checkoutSlice,
        order: orderSlice,
        admin: adminSlice,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice
    }
});

export default store;