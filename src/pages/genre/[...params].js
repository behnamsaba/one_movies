import movieDbApi from '@/api/externalApi';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Format from '@/layout/Format';
import Link from 'next/link';

const ByGenre = ({moviesGenre,genre_id,genre}) => {

    return (
        <Format>
            <Content
                title={genre}
                items={moviesGenre.results}
                Component={MediaList}
            />
            <button>
                <Link href={`/genre/${genre}/${genre_id}/${parseInt(moviesGenre.page) + 1}`}>Next Page</Link>
            </button>
        </Format>
    );
};

export async function getServerSideProps({ params }) {
  const[genre,genre_id,page] = params.params
    const moviesGenre = await movieDbApi.searchByGenre(genre_id, page);

    return {
        props: {
            moviesGenre,
            genre_id,
            genre
        },
    };
}

export default ByGenre;
