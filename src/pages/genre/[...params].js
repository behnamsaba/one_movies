import movieDbApi from '@/api/externalApi';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Format from '@/layout/Format';
import Link from 'next/link';

const ByGenre = ({ moviesGenre, genre, genre_id }) => {
    const nextPageLink = `/genre/${genre}/${genre_id}/${parseInt(moviesGenre.page) + 1}`;

    return (
        <Format>
            <Content
                title={genre}
                items={moviesGenre.results}
                Component={MediaList}
            />
            <button>
                <Link href={nextPageLink}>
                    Next Page
                </Link>
            </button>
        </Format>
    );
};

export async function getServerSideProps({ params: { params: [genre, genre_id, page] } }) {
    if(!genre || !genre_id || !page) {
      return { notFound: true };
    }
  
    let moviesGenre;
    try {
        moviesGenre = await movieDbApi.searchByGenre(genre_id, page);
    } catch (e) {
        return { notFound: true };
    }

    return {
        props: {
            moviesGenre,
            genre_id,
            genre,
        },
    };
}

export default ByGenre;
