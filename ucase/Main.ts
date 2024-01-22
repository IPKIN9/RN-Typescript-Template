import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IAxiosConfig extends AxiosRequestConfig {
    withCredentials: boolean;
}

const createCustomAxiosInstance = (): AxiosInstance => {
    const axiosConfig: IAxiosConfig = {
        baseURL: "http://192.168.1.102:8009",
        responseType: 'json',
        withCredentials: true,
    };

    return axios.create(axiosConfig);
};
export default createCustomAxiosInstance;