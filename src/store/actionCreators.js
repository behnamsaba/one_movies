import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import oneMoviesApi from '../api/api';

const API_KEY = '126ffc3a7d84e0ca2220b11fbb5e8e3a';
const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}fbb5e8e3a&language=en-US&page=1`;

export const fetchTopRated = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}fbb5e8e3a&language=en-US&page=1`
    );
    console.log(response);
    return response.data;
});

export const getGenres = createAsyncThunk('genres/fetchGenres', async () => {
    const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US'
    );
    console.log(response);
    return response.data;
});

export const loginUser = createAsyncThunk('login/userLogin', async (data) => {
    try {
        const token = await oneMoviesApi.login(data);
        oneMoviesApi.token = token;
        localStorage.setItem('one_movies', token);
        return token;
    } catch (error) {
        console.log('err', error);
        return rejectWithValue(error[0]);
    }
});

export const registerUser = createAsyncThunk(
    'users/AddUser',
    async (data, { rejectWithValue }) => {
        try {
            const token = await oneMoviesApi.signUp(data);
            oneMoviesApi.token = token;
            return token;
        } catch (error) {
            console.log('err', error);
            return rejectWithValue(error[0]);
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
            console.log('err', error);
            return rejectWithValue(error[0]);
        }
    }
);
