import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';

export default function Home({ latestMovies, latestSeries }) {
    console.log(latestSeries)
    return (
        <Format>
          <div className='page-description'>
          ONEMOVIES is a full-stack web application that communicates with the external TMDB API, alongside an internal PostgreSQL database which is utilized for user authentication and watchlist storage. Next.js is employed for both the frontend and backend, providing server-side rendering which optimizes SEO performance. The Redux toolkit has been used for managing internal states and functions.
          </div>
            <Content
                title='Latest Movies'
                items={latestMovies}
                Component={MediaList}
            />
            <Content
                title='Latest TV-Series'
                items={latestSeries}
                Component={MediaList}
            />
        </Format>
    );
}

export async function getStaticProps() {
    const latestSeries = await movieDbApi.getLatestSeries();
    const latestMovies = await movieDbApi.getLatestMovies();

    return {
        props: {
            latestSeries: latestSeries.results,
            latestMovies: latestMovies.results,
        },
    };
}
