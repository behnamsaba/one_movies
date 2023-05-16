import { useDispatch } from 'react-redux';
import { getUsername ,getGenres } from '../store/actionCreators';
import { useEffect } from 'react';


const GlobalActions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);



    return;
};

export default GlobalActions;
