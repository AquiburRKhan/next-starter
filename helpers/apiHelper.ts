import axios, { AxiosInstance }  from 'axios';
import { parseCookies } from 'nookies';

const apiInterceptor = async (apiInstance) => {
    await apiInstance.interceptors.request.use(config => {
        const { access_token } = parseCookies();

        config.headers['Content-Type'] = 'application/json';
        access_token ? config.headers['Authorization'] = `Bearer ${access_token}` : '';
        return config;
    })
}

export const post = async (url: string, data: object, config?: object ) => {
    const baseInstance: AxiosInstance = axios.create({
        baseURL: `${process.env.api}`
    });

    await apiInterceptor(baseInstance)

    return await baseInstance.post(url, data, config);
}

export const get = async (url: string, config?: object ) => {
    const baseInstance: AxiosInstance = axios.create({
        baseURL: `${process.env.api}`
    });

    await apiInterceptor(baseInstance)

    return await baseInstance.get(url, config);
}