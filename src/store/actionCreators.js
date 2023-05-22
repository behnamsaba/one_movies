import { createAsyncThunk } from '@reduxjs/toolkit';
import oneMoviesApi from '../api/api';
import MovieDbApi from '@/api/externalApi';

// Internal database functions
export const loginUser = createAsyncThunk(
    'login/userLogin',
    async (data, { rejectWithValue }) => {
        try {
            const token = await oneMoviesApi.login(data);
            oneMoviesApi.token = token;
            localStorage.setItem('one_movies', token);
            return token;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const registerUser = createAsyncThunk(
    'users/AddUser',
    async (data, { rejectWithValue }) => {
        try {
            const token = await oneMoviesApi.signUp(data);
            oneMoviesApi.token = token;
            return token;
        } catch (err) {
            return rejectWithValue(err[0]);
        }
    }
);

export const userChange = createAsyncThunk(
    'user/changeUser',
    async ({ username, data }, { rejectWithValue }) => {
        try {
            let changedUser = await oneMoviesApi.saveProfile(username, data);
            return changedUser;
        } catch (error) {
            return rejectWithValue(error[0]);
        }
    }
);

export const addWatch = createAsyncThunk(
    'user/addWatchList',
    async (data, { rejectWithValue }) => {
        try {
            let response = await oneMoviesApi.addWatchList(data);
            return response;
        } catch (error) {
            return rejectWithValue(error[0]);
        }
    }
);

export const delWatch = createAsyncThunk(
    'user/RemoveWatchList',
    async (data, { rejectWithValue }) => {
        try {
            let response = await oneMoviesApi.addWatchList(data);
            return response;
        } catch (error) {
            return rejectWithValue(error[0]);
        }
    }
);


//external functions for

export const getGenres = createAsyncThunk('genres/fetchGenres', async () => {
    let response = await MovieDbApi.getGenres();
    return response;
});
