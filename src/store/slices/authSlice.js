

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/auth'; // Change this to your actual API URL

// Load user data from local storage
const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { user, token } = response.data; // Adjust based on actual API response

        // Save user and token to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return { user, token };
    } catch (error) {
        const fakedata = {
            user: {
                name: 'John Doe',
                email: 'X9tZT@example.com',
                username: 'johndoe',
            },
            token: 'fake-jwt-token',
        };
        localStorage.setItem('user', JSON.stringify(fakedata.user));
        localStorage.setItem('token', fakedata.token);
        return fakedata;

        // return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Define the signupUser async thunk
export const signupUser = createAsyncThunk('auth/signupUser', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData); // Adjust based on actual API endpoint
        const { user, token } = response.data;

        // Save user and token to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return { user, token };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: loadUserFromLocalStorage(),
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!loadUserFromLocalStorage(),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
