import { useDispatch } from 'react-redux';
import { addWatch } from '@/store/actionCreators';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const AddWatchlist = ({
    username,
    id,
    category,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    first_air_date,
}) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const addWatchListHandler = async () => {
        try {
            await dispatch(
                addWatch({
                    username,
                    category,
                    apiId: id,
                    title: title || name,
                    posterPath: poster_path,
                    rating: vote_average,
                    releaseDate: release_date || first_air_date,
                })
            ).unwrap();
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col">
            <button
                onClick={addWatchListHandler}
                className="btn-red flex items-center justify-center"
            >
                <AiOutlinePlus className="mr-2" />
                <span>Add to watchlist</span>
            </button>
            {error && <p className="text-white mt-4 font-bold">{error}</p>}
        </div>
    );
};

export default AddWatchlist;
