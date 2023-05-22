import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

class oneMoviesApi {
    // the token for interactive with the API will be stored here.
    // the token for interacting with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `${oneMoviesApi.token}` };
        const params = method === 'get' || method === 'delete' ? data : {};

        try {
            return (
                await axios({
                    url,
                    method,
                    data: method === 'get' || method === 'delete' ? {} : data,
                    params,
                    headers,
                })
            ).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.err;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    //sign up

    static async signUp(data) {
        let res = await this.request(`api/auth/signup`, data, 'post');
        return res.token;
    }

    //login

    static async login(data) {
        let res = await this.request(`api/auth/login`, data, 'post');
        return res.token;
    }

    // get current user

    static async getCurrentUser(username) {
        let res = await this.request(`api/profile/${username}`);
        return res;
    }

    //modify user data
    static async saveProfile(username, data) {
        let res = await this.request(`api/profile/${username}`, data, 'patch');
        return res;
    }

    //add to watchlist
    static async addWatchList(username, data) {
        let res = await this.request(`api/profile/${username}`, data, 'post');
        return res;
    }

    //remove an item from watchlist
    static async removeItem(username, id) {
        let res = await this.request(
            `api/profile/${username}?apiId=${id}`,
            {},
            'delete'
        );
        return res;
    }
}

export default oneMoviesApi;
