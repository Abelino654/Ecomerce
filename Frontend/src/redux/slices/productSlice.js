
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

// Async thunk to fetch products by filters or collections
export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilter", async ({
    collection,
    limit,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    brand

}) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (color) query.append("color", color);
    if (brand) query.append("brand", brand);
    if (category) query.append("category", category);
    if (search) query.append("search", search);
    if (sortBy) query.append("sortBy", sortBy);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (minPrice) query.append("minPrice", minPrice);
    if (gender) query.append("gender", gender);
    if (size) query.append("size", size);
    if (limit) query.append("limit", limit);



    try {
        const queryString = query.toString();
        const url = queryString
            ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/filterProducts?${queryString}`
            : `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/filterProducts`;
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err.response;

    }

})


// Async thunk to fetch product details by id
export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id) => {
    try {

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/singleProduct/${id}`);

        return res.data
    } catch (err) {
        console.error(err.response);
        throw err
    }
})

// Async thunk to update products
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, productData }) => {
    try {

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/updateProduct/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });

        return response.data;

    } catch (err) {
        console.error(err)
        throw err
    }
})


// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts", async (id) => {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getSimilarProduct/${id}`);

    return response.data;
})





//Product Slice

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: {},
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: ""
        }
    },

    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: ""
            }
        }



    },


    extraReducers: (builder) => {
        builder
            // ✅ Fetch Products by Filters
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //  Fetch Product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message;
            })

            //  Update Product
            .addCase(updateProduct.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;

                // ✅ Fix: Update product correctly
                const index = state.products.findIndex(prod => prod._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload; // `state.selectedProduct` ki jagah `action.payload` use karein
                }

            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // ✅ Fetch Similar Products
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.similarProducts = action.payload;
                state.loading = false;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }


})


export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer