import { clearData } from './TokenConfig'

interface AxiosError {
    response?: {
        data: any;
        status: number;
        headers: any;
    };
    request?: any;
    message: string;
    config?: any; // Add the 'config' property
    isAxiosError: boolean;
    code?: string;
}

const errorProduce = async (error: AxiosError) => {
    if (error.response) {
        if (error.response.status) {
            await clearData()
        }
        // The request was made, but the server responded with a status code that falls out of the range of 2xx
        console.error('Server responded with non-2xx status:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
    } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server');
        console.error('Request details:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
    }

    // Log additional information about the network error
    if (error.isAxiosError && error.code === 'ECONNABORTED') {
        console.error('The request timed out');
    } else if (error.isAxiosError && error.response === undefined) {
        console.error('Network error. Could not connect to the server.');
    } else {
        console.error('Other Axios error details:', error.config);
    }
}

export { errorProduce }