import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import oneMoviesApi from '../api/api';
import { setUser, setToken } from '@/store/internalDataSlice';
import { getGenres } from '@/store/actionCreators';
import jwt_decode from 'jwt-decode';

const GlobalActions = () => {
    const dispatch = useDispatch();
    const stateToken = useSelector((data) => data.internalDataSlice.token);
    const token =
        typeof window !== 'undefined'
            ? window.localStorage.getItem('one_movies') || stateToken
            : null;

    useEffect(() => {
        if (!token) {
            dispatch(setUser(null));
            return;
        }

        async function getCurrentUser() {
            try {
                let { username } = jwt_decode(token);
                oneMoviesApi.token = token;
                let user = await oneMoviesApi.getCurrentUser(username);
                dispatch(setToken(token))
                dispatch(setUser(user));
      
            } catch (error) {
                dispatch(setUser(null));
            }
        }

        getCurrentUser();
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    return;
};

export default GlobalActions;
