//HIGHER ORDER COMPONENT
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import oneMoviesApi from '../api/api';
import { setUser, setToken } from '@/store/internalDataSlice';
import { setHydrated } from '@/store/internalDataSlice';
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
            dispatch(setHydrated(true));
            return;
        }

        async function getCurrentUser() {
            try {
                let { username } = jwt_decode(token);
                oneMoviesApi.setToken(token);
                let user = await oneMoviesApi.getCurrentUser(username);
                dispatch(setToken(token));
                dispatch(setUser(user));
                dispatch(setHydrated(true));
      
            } catch (error) {
                // invalid/expired token: clear state and storage
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('one_movies');
                }
                oneMoviesApi.setToken(null);
                dispatch(setToken(null));
                dispatch(setUser(null));
                dispatch(setHydrated(true));
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
