import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import Link from 'next/link';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';

const tvSeries = ({ initialSeries, page }) => {


    return (
        <Format>
            <h1>page number {page}</h1>
            <Content title="Latest TV-Series" items={initialSeries} Component={MediaList} />

            <button>{page}</button>
            <button>
                <Link href={`/tv-series/${parseInt(page) + 1}`}>Next Page</Link>
            </button>
        </Format>
    );
};

export async function getStaticProps({ params }) {
    const page = params.page;
    const initialSeries = await movieDbApi.getLatestSeries(page);

    return {
        props: {
            initialSeries:initialSeries.results,
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

export default tvSeries;
