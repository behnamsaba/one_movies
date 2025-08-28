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

import { useState } from 'react';
import TrailerModal from '@/components/TrailerModal';

const Id = ({ info, similar, trailerKey }) => {
    const userInfo = useSelector((data) => data.internalDataSlice.user);
    const {
        query: { play },
    } = useRouter();
    const [showTrailer, setShowTrailer] = useState(false);
    // store recently viewed (client-only)
    if (typeof window !== 'undefined') {
        try {
            const rv = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            const entry = {
                id: info.id,
                play,
                title: info.title || info.name || info.original_title || info.original_name,
                poster_path: info.poster_path || null,
                backdrop_path: info.backdrop_path || null,
                media_type: play === 'show' ? 'tv' : 'movie',
            };
            const key = `${entry.media_type}-${entry.id}`;
            const next = [entry, ...rv.filter((e) => `${e.media_type}-${e.id}` !== key)].slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(next));
        } catch {}
    }

    return (
        <Format>
            {play === 'movie' ? (
                <MovieDetails {...info} trailerKey={trailerKey} onWatchTrailer={() => setShowTrailer(true)} />
            ) : (
                <ShowDetails {...info} trailerKey={trailerKey} onWatchTrailer={() => setShowTrailer(true)} />
            )}
            <TrailerModal
                open={showTrailer}
                onClose={() => setShowTrailer(false)}
                youtubeKey={trailerKey}
            />
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
    let videos;
    if (play === 'movie') {
        info = await movieDbApi.getMovieDetails(id);
        similar = await movieDbApi.getSimilarMovie(id);
        videos = await movieDbApi.getMovieVideos(id);
    } else if (play === 'show') {
        info = await movieDbApi.getShowDetails(id);
        similar = await movieDbApi.getSimilarTv(id);
        videos = await movieDbApi.getShowVideos(id);
    } else {
        return { notFound: true };
    }
    // pick best YouTube trailer
    const pickTrailer = (list = []) => {
        if (!Array.isArray(list)) return null;
        const yt = list.filter(v => v.site === 'YouTube');
        const officialTrailer = yt.find(v => v.type === 'Trailer' && (v.official || v.name?.toLowerCase().includes('official')));
        if (officialTrailer) return officialTrailer.key;
        const anyTrailer = yt.find(v => v.type === 'Trailer') || yt[0];
        return anyTrailer ? anyTrailer.key : null;
    };
    const trailerKey = pickTrailer(videos?.results);
    return {
        props: { info, similar, trailerKey },
    };
}

export default Id;
