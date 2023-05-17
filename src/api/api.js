import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class oneMoviesApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `${oneMoviesApi.token}` };
        const params = method === 'get' ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
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
        return res
    }

    //modify user data
    static async saveProfile(username, data) {
        let res = await this.request(`api/profile/${username}`, data, 'patch');
        return res
    }
}

export default oneMoviesApi;
