import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import movieDbApi from '@/api/externalApi';
import ShowDetails from '@/components/ShowDetails';
import MovieDetails from '@/components/MovieDetails';
import { useSelector,useDispatch } from 'react-redux';
import { addWatch } from '@/store/actionCreators';

const Id = ({ info }) => {
    const profileData = useSelector((data) => data.internalDataSlice);
    const dispatch = useDispatch()
    const {
        query: { play },
    } = useRouter();

    const addWatchListHandler = async () => {
        await dispatch(addWatch({username : profileData.user.username, apiId: info.id,title:info.title, posterPath: info.poster_path,
        rating:info.vote_count,releaseDate:info.release_date}))
        
    


    }

    return (
        <div>
            {play === 'movie' ? (
                <MovieDetails {...info} />
            ) : (
                <ShowDetails {...info} />
            )}
            {profileData.user && <button onClick={addWatchListHandler}>Add to watchlist</button>}
        </div>
    );
};

Id.propTypes = {
    info: PropTypes.object.isRequired,
};

export async function getServerSideProps({ params }) {
    const { id, play } = params;
    if (!parseInt(id)) {
        return { notFound: true };
    }

    let info;
    if (play === 'movie') {
        info = await movieDbApi.getMovieDetails(id);
    } else if (play === 'show') {
        info = await movieDbApi.getShowDetails(id);
    } else {
        return { notFound: true };
    }

    return {
        props: { info },
    };
}

export default Id;
