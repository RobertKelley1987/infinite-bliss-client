import axios from 'axios';

const productionURL = '/';

export const api = axios.create({
    baseURL: productionURL, 
    withCredentials: true
});