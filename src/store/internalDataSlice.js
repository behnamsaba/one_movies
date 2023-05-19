import { createSlice } from '@reduxjs/toolkit';
import {
    getUsername,
    registerUser,
    loginUser,
    userChange,
} from './actionCreators';
const initialState = {
    token: null,
};

const userSlice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('one_movies'); // Remove token from localStorage
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //adda new user
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }) //user login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(userChange.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userChange.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(userChange.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setToken, clearToken, setUser } = userSlice.actions;
export default userSlice.reducer;
