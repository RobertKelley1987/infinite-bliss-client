import axios from 'axios';

const productionURL = 'https://infinite-bliss-server.onrender.com';

export const api = axios.create({
    baseURL: productionURL, 
    withCredentials: true
});