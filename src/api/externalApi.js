import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

class movieDbApi {
    static async request(endpoint, method = 'get') {
        const url = `${BASE_URL}/${endpoint}`;
        try {
            return (await axios({ url, method })).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.err;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //Get Movies From External API
    static async getMovies(page = '1') {
        let res = await this.request(
            `discover/movie?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
        );
        return res;
    }
    static async getMovieDetails(id = '980078') {
        let res = await this.request(
            `movie/${id}?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US`
        );
        return res;
    }
    static async getLatestMovies() {
        let res = await this.request(
            'movie/now_playing?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US&page=1'
        );
        return res;
    }
    static async getReviews(id = '980078') {
        let res = await this.request(
            `movie/${id}/reviews?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US&page=1`
        );
        return res;
    }

    //Get Series From External API
    static async getLatestSeries(page="1") {
        let res = await this.request(
            `tv/airing_today?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US&page=${page}`
        );
        return res;
    }

    static async getShowDetails(id) {
        let res = await this.request(
            `tv/${id}?api_key=126ffc3a7d84e0ca2220b11fbb5e8e3a&language=en-US`
        )
        return res
    }

}

export default movieDbApi;
