import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Hero from '@/components/Hero';
import Row from '@/components/Row';
import { useEffect, useState } from 'react';

export default function Home({ hero, heroTrailerKey, heroProviders, nowPlaying, upcoming, topRatedMovies, onTheAir, topRatedTV }) {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    useEffect(() => {
        try {
            const rv = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            setRecentlyViewed(rv);
        } catch {}
    }, []);

    return (
        <Format>
            <div className='px-4'>
                <Hero item={hero} trailerKey={heroTrailerKey} providers={heroProviders} />
            </div>

            {recentlyViewed.length > 0 && (
                <Row title='Recently Viewed' items={recentlyViewed} viewAllHref={null} />
            )}

            <Row title='Now Playing' items={nowPlaying} viewAllHref='/movies/1' />
            <Row title='Upcoming Movies' items={upcoming} viewAllHref='/movies/1' />
            <Row title='Top Rated Movies' items={topRatedMovies} viewAllHref='/top-imdb/1' />
            <Row title='On The Air (TV)' items={onTheAir} viewAllHref='/tv-series/1' />
            <Row title='Top Rated TV' items={topRatedTV} viewAllHref='/tv-series/1' />
        </Format>
    );
}

export async function getStaticProps() {
    // Fetch data for home rows
    const [trending, nowPlaying, upcoming, topRatedMovies, onTheAir, topRatedTV] = await Promise.all([
        movieDbApi.trendingAllDay(),
        movieDbApi.nowPlayingMovies(),
        movieDbApi.upcomingMovies(),
        movieDbApi.topRatedMovies(),
        movieDbApi.onTheAirTV(),
        movieDbApi.topRatedTV(),
    ]);

    // Hero: pick first trending item with a backdrop
    const hero = (trending.results || []).find((i) => i.backdrop_path) || trending.results?.[0] || null;

    // Enrich hero with trailer key and providers (best effort)
    let heroTrailerKey = null;
    let heroProviders = [];
    try {
        if (hero) {
            const isTv = hero.media_type === 'tv';
            const videos = isTv ? await movieDbApi.getShowVideos(hero.id) : await movieDbApi.getMovieVideos(hero.id);
            const yt = (videos?.results || []).filter((v) => v.site === 'YouTube');
            const official = yt.find((v) => v.type === 'Trailer' && (v.official || v.name?.toLowerCase().includes('official')));
            heroTrailerKey = (official || yt.find((v) => v.type === 'Trailer') || yt[0])?.key || null;

            const providers = await movieDbApi.watchProviders(isTv ? 'tv' : 'movie', hero.id);
            const region = 'US';
            heroProviders = providers?.results?.[region]?.flatrate || [];
        }
    } catch {}

    return {
        props: {
            hero,
            heroTrailerKey,
            heroProviders,
            nowPlaying: nowPlaying.results || [],
            upcoming: upcoming.results || [],
            topRatedMovies: topRatedMovies.results || [],
            onTheAir: onTheAir.results || [],
            topRatedTV: topRatedTV.results || [],
        },
        revalidate: 3600, // hourly refresh
    };
}
