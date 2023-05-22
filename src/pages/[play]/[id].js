import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import movieDbApi from '@/api/externalApi';
import ShowDetails from '@/components/ShowDetails';
import MovieDetails from '@/components/MovieDetails';
import AddWatchlist from '@/components/AddWatchlist';
import { useSelector } from 'react-redux';

const Id = ({ info }) => {
    const userInfo = useSelector((data) => data.internalDataSlice.user);
    console.log(userInfo)
    const {
        query: { play },
    } = useRouter();
    return (
        <div>
            {play === 'movie' ? (
                <MovieDetails {...info} />
            ) : (
                <ShowDetails {...info} />
            )}
            {userInfo && (
                <AddWatchlist
                    username={userInfo.username}
                    category={play}
                    {...info}
                />
            )}
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
