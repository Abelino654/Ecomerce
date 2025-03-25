import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users admins
export const fetchAdminUsers = createAsyncThunk(
    "admin/fetchAdminUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getAllUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Add user
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addNewAdmin`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            console.error(err.message);
            return rejectWithValue(err.response.data);
        }
    }
);

// Update user info
export const updateUser = createAsyncThunk(
    "admin/updateUserDetails",
    async ({ id, name, email, role }, { rejectWithValue }) => {
        try {
           
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/updateDetails/${id}`,
                { name, email, role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
         
            return response.data;
        } catch (err) {
            console.error("Error updating user:", err);
            return rejectWithValue(err.response.data);
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/deleteUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
         
            return id;
        } catch (err) {
            console.error("Error deleting user:", err);
            return rejectWithValue(err.response.data);
        }
    }
);

// Slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchAdminUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users || action.payload; // Handle different response structures
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch users";
            })
            // Add User
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user || action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add user";
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload.user || action.payload; // Handle different response structures
                const index = state.users.findIndex((user) => user._id === updatedUser._id); // Fixed: Use === instead of .equals
                if (index !== -1) {
                    state.users[index] = updatedUser; // Fixed: Use updatedUser
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update user";
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload); // action.payload is the id
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete user";
            });
    }
});

export default adminSlice.reducer;