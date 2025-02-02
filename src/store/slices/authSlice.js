

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://127.0.0.1:8000/api'; // Change this to your actual API URL

// Load user data from local storage
const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('userData');
      
    if (userData) {
        return  JSON.parse(userData);

    }
    return null;
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        const userData  = response.data; // Adjust based on actual API response
        // Save user data to local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        return userData;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);

        // return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Define the signupUser async thunk
export const signupUser = createAsyncThunk('auth/signupUser', async (userData, thunkAPI) => {
    try {

         const response = await axios.post('http://127.0.0.1:8000/api/register', userData, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
        // const response = await axios.post(`${API_URL}/register`, userData); // Adjust based on actual API endpoint
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
        userData: loadUserFromLocalStorage(),
        isAuthenticated: !!loadUserFromLocalStorage(),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userData = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload;
                
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
