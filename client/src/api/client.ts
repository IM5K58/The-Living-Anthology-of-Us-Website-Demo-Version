// client/src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // vite proxy를 타게 됨
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;