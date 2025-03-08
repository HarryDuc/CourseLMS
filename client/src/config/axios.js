import axios from 'axios';
import { toast } from 'react-hot-toast';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage nếu cần
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Xử lý các lỗi response
            switch (error.response.status) {
                case 401:
                    // Xử lý lỗi unauthorized
                    break;
                case 403:
                    // Xử lý lỗi forbidden
                    break;
                case 404:
                    // Xử lý lỗi not found
                    break;
                case 400:
                    toast.error(error.response.data.message || 'Yêu cầu không hợp lệ');
                    break;
                default:
                    toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default instance;