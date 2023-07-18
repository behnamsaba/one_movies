import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import Link from 'next/link';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';

const Top = ({ initialMovies, page }) => {
    return (
        <Format>
            <p className='page-description'>
                The IMDb Top 250 is a list of the top rated 250 films, based on
                ratings by the registered users of the website using the methods
                described.
            </p>
            <Content
                title='Top IMDb'
                items={initialMovies}
                Component={MediaList}
            />

            <div className='flex justify-center space-x-4 mt-4'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    <Link href={`/top-imdb/${parseInt(page) + 1}`}>
                        Next Page
                    </Link>
                </button>
            </div>
        </Format>
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
