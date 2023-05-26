import Format from '@/layout/Format';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import movieDbApi from '@/api/externalApi';
import ShowDetails from '@/components/ShowDetails';
import MovieDetails from '@/components/MovieDetails';
import AddWatchlist from '@/components/AddWatchlist';
import Content from '@/components/Content';
import MediaList from '@/components/MediaList';
import { useSelector } from 'react-redux';

const Id = ({ info, similar }) => {
    const userInfo = useSelector((data) => data.internalDataSlice.user);
    const {
        query: { play },
    } = useRouter();
    return (
        <Format>
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
            <Content
                title='Similar'
                items={similar.results}
                Component={MediaList}
            />
        </Format>
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
    let similar;
    if (play === 'movie') {
        info = await movieDbApi.getMovieDetails(id);
        similar = await movieDbApi.getSimilarMovie(id);
    } else if (play === 'show') {
        info = await movieDbApi.getShowDetails(id);
        similar = await movieDbApi.getSimilarTv(id);
    } else {
        return { notFound: true };
    }

    return {
        props: { info, similar },
    };
}

export default Id;
