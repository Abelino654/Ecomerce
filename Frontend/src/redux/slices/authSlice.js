import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Getting user info from local storage
let userInfoFromLocalStorage = null;
try {
    const storedUserInfo = localStorage.getItem("userInfo");
    userInfoFromLocalStorage = storedUserInfo ? JSON.parse(storedUserInfo) : null;
} catch (err) {
    console.error("Failed to parse userInfo from localStorage:", err);
}

// Setting or getting the guest details 
const initGuestInfo = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initGuestInfo);




// Initial state for user
const initialState = {
    user: userInfoFromLocalStorage,
    guestId: initGuestInfo,
    loading: false,
    error: null
}


// Create Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
     
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, userData)

  
        localStorage.setItem("userInfo", JSON.stringify(response?.data?.user));
        localStorage.setItem("userToken", response?.data?.token);
        return response?.data?.user
    } catch (err) {
        console.error(err);
        return rejectWithValue(err.response.data)

    }
})

// Create Async thunk for user login
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, userData)

        localStorage.setItem("userInfo", JSON.stringify(response?.data?.user));
        localStorage.setItem("userToken", response?.data?.token);
        return response?.data?.user
    } catch (err) {
        return rejectWithValue(err.response.data)

    }
})


const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId);



        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })

    }
})


export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer
