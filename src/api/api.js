import axios from 'axios';

// Centralized axios client with token injection
const axiosInstance = axios.create({ baseURL: '/' });

class oneMoviesApi {
    // in-memory token used for requests
    static token = null;

    static setToken(token) {
        oneMoviesApi.token = token || null;
    }

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);
        const url = `/${endpoint}`;
        const params = method === 'get' ? data : {};
        try {
            const res = await axiosInstance.request({
                url,
                method,
                data,
                params,
                headers: oneMoviesApi.token
                    ? { Authorization: `${oneMoviesApi.token}` }
                    : undefined,
            });
            return res.data;
        } catch (err) {
            let message = err?.response?.data?.err || err.message;
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
    static async removeItem(username, apiId) {
        let res = await this.request(`api/profile/${username}/${apiId}`, null, 'delete');
        return res;
    }
}

export default oneMoviesApi;
export { axiosInstance };
