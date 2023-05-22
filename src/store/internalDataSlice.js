import { createSlice } from '@reduxjs/toolkit';
import {
    registerUser,
    loginUser,
    userChange,
    addWatch,
    delItem,
} from './actionCreators';
const initialState = {
    token: null,
};

const userSlice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
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
            })
            .addCase(addWatch.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addWatch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = {
                    ...state.user,
                    watchlist: [...state.user.watchlist, action.payload],
                };
            })
            .addCase(addWatch.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(delItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(delItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = {...state.user, watchlist: state.user.watchlist.filter(obj => (obj.id !== (action.payload)))}
            })
            .addCase(delItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setToken, clearToken, setUser } = userSlice.actions;
export default userSlice.reducer;
