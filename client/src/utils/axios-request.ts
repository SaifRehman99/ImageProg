import axios, { Method, AxiosResponse } from 'axios';

  
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API
});


const request = (method: Method, url: string, params?: any, data?: any, headers?: any): Promise<AxiosResponse> => {

    return api.request({
        method,
        url,
        params,
        data,
        headers,
    });
};

export default request;