import Format from '@/layout/Format';
import movieDbApi from '@/api/externalApi';
import Link from 'next/link';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';

const tvSeries = ({ initialSeries, page }) => {
    return (
        <Format>
            <Content
                title='Latest TV-Series'
                items={initialSeries}
                Component={MediaList}
            />
            <div className='flex justify-center space-x-4 my-4'>
                <button className='nextpage-btn'>
                    <Link href={`/tv-series/${parseInt(page) + 1}`}>
                        Next Page
                    </Link>
                </button>
            </div>
        </Format>
    );
};

export async function getStaticProps({ params }) {
    const page = params.page;
    const initialSeries = await movieDbApi.getLatestSeries(page);

    return {
        props: {
            initialSeries: initialSeries.results,
            page,
        },
    };
}

export async function getStaticPaths() {
    //pre-render page 1 to 2 in the server
    const pageCount = 2;
    const paths = Array.from({ length: pageCount }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export default tvSeries;
