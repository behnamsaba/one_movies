import { createSlice } from '@reduxjs/toolkit';
import {getUsername ,registerUser, loginUser } from './actionCreators';
const initialState = {user: null};

const userSlice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get username
            .addCase(getUsername.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsername.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUsername.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            //adduser
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
            }) //login
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
            });
    },
});

export default userSlice.reducer;
