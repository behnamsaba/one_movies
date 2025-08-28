import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const LANGUAGE = 'en-US';

class MovieDbApi {
    // very small in-memory cache for server-side fetching
    static cache = new Map();
    static CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

    static _key(method, endpoint, params) {
        // stable key across param order
        const stableParams = params && typeof params === 'object'
            ? Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&')
            : '';
        return `${method}:${endpoint}?${stableParams}`;
    }
    static axiosInstance = axios.create({
        baseURL: BASE_URL,
        params: {
            api_key: API_KEY,
            language: LANGUAGE,
        },
    });

    static async request(endpoint, method = 'get', params = {}) {
        try {
            // Try cache for GETs
            if (method.toLowerCase() === 'get') {
                const key = this._key(method, endpoint, params);
                const cached = this.cache.get(key);
                if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL_MS) {
                    return cached.data;
                }
            }

            const response = await this.axiosInstance.request({
                url: endpoint,
                method,
                params,
            });
            const data = response.data;
            if (method.toLowerCase() === 'get') {
                const key = this._key(method, endpoint, params);
                this.cache.set(key, { data, timestamp: Date.now() });
            }
            return data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response?.data?.error || err.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getMovies(page = '1') {
        return this.request('discover/movie', 'get', {
            page,
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            with_watch_monetization_types: 'flatrate',
        });
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

    static async getLatestSeries(page = '1') {
        return this.request('tv/airing_today', 'get', { page });
    }

    static async getShowDetails(id) {
        return this.request(`tv/${id}`);
    }
    
    // videos (trailers/teasers)
    static async getMovieVideos(id) {
        return this.request(`movie/${id}/videos`, 'get');
    }

    static async getShowVideos(id) {
        return this.request(`tv/${id}/videos`, 'get');
    }

    static async movieSearch(query) {
        return this.request('search/multi', 'get', {
            page: '1',
            include_adult: false,
            query,
        });
    }

    static async getGenres() {
        return this.request(`genre/movie/list`);
    }
    static async getTvGenres() {
        return this.request(`genre/tv/list`);
    }

    static async imdbTop() {
        return this.request('movie/top_rated', 'get', { page: '1' });
    }

    static async getSimilarTv(id) {
        return this.request(`tv/${id}/similar`, 'get');
    }
    static async getSimilarMovie(id) {
        return this.request(`movie/${id}/similar`, 'get');
    }
    static async searchByGenre(with_genres,page){
      return this.request('discover/movie', 'get', {
        with_genres,
        page
    })

    }

    static async discoverMovies({ page = 1, with_genres, min_rating }) {
        const params = { page: String(page), include_adult: false, include_video: false };
        if (with_genres) params.with_genres = with_genres;
        if (min_rating != null) params['vote_average.gte'] = min_rating;
        return this.request('discover/movie', 'get', params);
    }

    static async discoverTv({ page = 1, with_genres, min_rating }) {
        const params = { page: String(page) };
        if (with_genres) params.with_genres = with_genres;
        if (min_rating != null) params['vote_average.gte'] = min_rating;
        return this.request('discover/tv', 'get', params);
    }

    // New: Home page helpers
    static async trendingAllDay() {
        return this.request('trending/all/day', 'get');
    }
    static async nowPlayingMovies(page = '1') {
        return this.request('movie/now_playing', 'get', { page });
    }
    static async upcomingMovies(page = '1') {
        return this.request('movie/upcoming', 'get', { page });
    }
    static async topRatedMovies(page = '1') {
        return this.request('movie/top_rated', 'get', { page });
    }
    static async onTheAirTV(page = '1') {
        return this.request('tv/on_the_air', 'get', { page });
    }
    static async topRatedTV(page = '1') {
        return this.request('tv/top_rated', 'get', { page });
    }
    static async watchProviders(type, id) {
        // type: 'movie' | 'tv'
        return this.request(`${type}/${id}/watch/providers`, 'get');
    }
}

export default MovieDbApi;
