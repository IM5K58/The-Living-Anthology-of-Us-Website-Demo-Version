// client/src/api/poetryApi.ts
import apiClient from './client';
import type { Poetry } from '../types/poetry';

export const getPoetryList = async (): Promise<Poetry[]> => {
    const response = await apiClient.get<Poetry[]>('/poetry'); // 백엔드 엔드포인트에 맞게 수정 (/poetry 또는 /articles 등)
    return response.data;
};

export const createPoetry = async (data: Omit<Poetry, 'id'>): Promise<Poetry> => {
    const response = await apiClient.post<Poetry>('/poetry', data);
    return response.data;
};