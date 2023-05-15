import { createSlice } from '@reduxjs/toolkit';
import {
    getGenres,
} from './actionCreators';
const initialState = {};

const apiSlice = createSlice({
    name: 'externalApi',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.genresList = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
    },
});

export default apiSlice.reducer;
