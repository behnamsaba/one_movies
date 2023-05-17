import { useDispatch } from 'react-redux';
import { getGenres } from '../store/actionCreators';
import { useEffect } from 'react';
import oneMoviesApi from '../api/api';
import { setUser } from '../store/internalDataSlice';
import jwt_decode from 'jwt-decode';

const GlobalActions = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCurrentUser() {
            const token = localStorage.getItem('one_movies');
            if (token) {
                try {
                    let { username } = jwt_decode(token);
                    oneMoviesApi.token = token;
                    let user = await oneMoviesApi.getCurrentUser(username);
                    dispatch(setUser(user));
                } catch (e) {
                    console.log(e);
                    dispatch(setUser(null));
                }
            }
        }

        getCurrentUser();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    return;
};

export default GlobalActions;
