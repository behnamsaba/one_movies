import movieDbApi from '../api/externalApi';
import MediaList from '../components/MediaList';
import Content from '../components/Content';

export default function Home({ latestMovies, latestSeries }) {
    return (
        <main>
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
        </main>
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
