import movieDbApi from '../../api/externalApi';
import MediaList from '../../components/MediaList';
import Content from '../../components/Content';

const query = (props) => {
    const all = props.result.results
    console.log(all)


    return (
        <div>
            <h1>Your heading here</h1>
            <Content
                title='Results:'
                items={all}
                Component={MediaList}
            />

            
        </div>
    );
};

export async function getServerSideProps({params}) {
    const searchKey = params.query
    const searched = await movieDbApi.movieSearch(searchKey);



    return {
        props: {
            result:searched
        },
    };
}



export default query;
