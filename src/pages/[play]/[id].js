import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import movieDbApi from '@/api/externalApi';
import ShowDetails from '@/components/ShowDetails';
import MovieDetails from '@/components/MovieDetails';
import UserAccess from '@/components/UserAccess';
import { useSelector } from 'react-redux';

const Id = ({ info }) => {
    const profileData = useSelector((data) => data.internalDataSlice);
    console.log('here we are', profileData);
    console.log('info', info);
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
            {profileData.user && <UserAccess />}
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
