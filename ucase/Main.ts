import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IAxiosConfig extends AxiosRequestConfig {
    withCredentials: boolean;
}

const createCustomAxiosInstance = (): AxiosInstance => {
    const axiosConfig: IAxiosConfig = {
        baseURL: "http://10.20.0.148:8009",
        responseType: 'json',
        withCredentials: true,
    };

    return axios.create(axiosConfig);
};
export default createCustomAxiosInstance;