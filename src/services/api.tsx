import axios from 'axios';

let baseURL = '/';
if(process.env.NODE_ENV === 'production') {
    baseURL = 'https://infinite-bliss-server.onrender.com';
}

export const api = axios.create({ baseURL, withCredentials: true });