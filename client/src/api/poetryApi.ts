// client/src/api/poetryApi.ts
import apiClient from './client';
import type { ArticleData } from '../types/poetry';

export const createPoetry = async (data: ArticleData): Promise<number> => {
    // 백엔드 URL이 /api/poetry -> /api/articles 로 변경됨
    const response = await apiClient.post<number>('/articles', data);
    return response.data;
};