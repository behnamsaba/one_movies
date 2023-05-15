import axios from 'axios';

const Home = ({ topRated }) => {
    console.log(topRated);
    return (
        <div>
            <h1>Home page</h1>
        </div>
    );
};

const API_KEY = '126ffc3a7d84e0ca2220b11fbb5e8e3a';
export async function getStaticProps() {
    const res = await axios.get(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US&page=1'
    );
    // const res = await axios.get(
    //     'https://api.themoviedb.org/3/genre/movie/list?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US'
    // );

    const topRated = res.data.results;

    return {
        props: {
            topRated,
        },
    };
}

export default Home;
