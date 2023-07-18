import movieDbApi from '@/api/externalApi';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';
import Format from '@/layout/Format';

const query = (props) => {
    const all = props.result.results;
    console.log(all);

    return (
        <Format>
            <Content
                title='Results'
                items={all}
                Component={MediaList}
            />
        </Format>
    );
};

export async function getServerSideProps({ params }) {
    const searchKey = params.query;
    const searched = await movieDbApi.movieSearch(searchKey);

    return {
        props: {
            result: searched,
        },
    };
}

export default query;
