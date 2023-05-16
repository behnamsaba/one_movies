import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const LANGUAGE = 'en-US';

class MovieDbApi {
    static axiosInstance = axios.create({
        baseURL: BASE_URL,
        params: {
            api_key: API_KEY,
            language: LANGUAGE,
        },
    });

    static async request(endpoint, method = 'get', params = {}) {
        try {
            const response = await this.axiosInstance.request({
                url: endpoint,
                method,
                params,
            });
            return response.data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response?.data?.error || err.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getMovies(page = '1') {
        return this.request('discover/movie', 'get', { page, sort_by: 'popularity.desc', include_adult: false, include_video: false, with_watch_monetization_types: 'flatrate' });
    }

    static async getMovieDetails(id = '980078') {
        return this.request(`movie/${id}`);
    }

    static async getLatestMovies() {
        return this.request('movie/now_playing', 'get', { page: '1' });
    }

    static async getReviews(id = '980078') {
        return this.request(`movie/${id}/reviews`, 'get', { page: '1' });
    }

    static async getByGenre() {
        return this.request('genre/movie/list');
    }

    static async getLatestSeries(page = "1") {
        return this.request('tv/airing_today', 'get', { page });
    }

    static async getShowDetails(id) {
        return this.request(`tv/${id}`);
    }

    static async movieSearch(query) {
        return this.request('search/multi', 'get', { page: '1', include_adult: true, query });
    }
}

export default MovieDbApi;
