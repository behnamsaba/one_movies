import movieDbApi from '../api/externalApi';
import MovieList from '../components/MovieList';
import SeriesList from '../components/SeriesList';
import Content from '../components/Content';

export default function Home({ latestMovies, latestSeries }) {
    return (
        <main>
            <Content
                title='Latest Movies'
                items={latestMovies}
                Component={MovieList}
            />
            <Content
                title='Latest TV-Series'
                items={latestSeries}
                Component={SeriesList}
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
