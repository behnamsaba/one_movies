import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const addWatchList = createAsyncThunk(
    'user/addWatchList',
    async ({ username, data }, { rejectWithValue }) => {
        try {
            let createMedia = await oneMoviesApi.createMedia(data);
            return changedUser;
        } catch (error) {
            return rejectWithValue(error[0]);
        }
    }
);

//external functions for 

// export const fetchTopRated = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}fbb5e8e3a&language=en-US&page=1`
//     );
//     console.log(response);
//     return response.data;
// });

export const getGenres = createAsyncThunk('genres/fetchGenres', async () => {
  let response = await MovieDbApi.getGenres()
    return response;
});