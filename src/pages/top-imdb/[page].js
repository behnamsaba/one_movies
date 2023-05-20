import movieDbApi from '../../api/externalApi';
import Link from 'next/link';
import MediaList from '../../components/MediaList';
import Content from '../../components/Content';

const Top = ({ initialMovies, page }) => {
    return (
        <div>
            <h1>Your heading here</h1>
            <h1>page number {page}</h1>
            <Content
                title='Top IMDb'
                items={initialMovies}
                Component={MediaList}
            />

            <button>{page}</button>
            <button>
                <Link href={`/top-imdb/${parseInt(page) + 1}`}>Next Page</Link>
            </button>
        </div>
    );
};

export async function getStaticProps({ params }) {
    const page = params.page;
    const initialMovies = await movieDbApi.imdbTop(page);

    return {
        props: {
            initialMovies: initialMovies.results,
            page,
        },
    };
}

export async function getStaticPaths() {
    //pre-render page 1 to 5 in the server
    const pageCount = 5;
    const paths = Array.from({ length: pageCount }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export default Top;
