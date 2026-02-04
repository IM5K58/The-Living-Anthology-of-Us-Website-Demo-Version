// client/src/api/poetryApi.ts
import apiClient from './client';
import type {ArticleData, ArticleListResponse, PageResponse} from '../types/poetry';

export const createPoetry = async (data: ArticleData): Promise<number> => {
    // 백엔드 URL이 /api/poetry -> /api/articles 로 변경됨
    const response = await apiClient.post<number>('/articles', data);
    return response.data;
};

// 글 목록 조회 API
// type: 'ESSAY' | 'RELAY'
export const fetchArticles = async (
    type?: 'ESSAY' | 'RELAY',
    page: number = 0,
    size: number = 6
): Promise<PageResponse<ArticleListResponse>> => {
    const response = await apiClient.get('/articles', {
        params: { type, page, size }
    });
    return response.data;
};