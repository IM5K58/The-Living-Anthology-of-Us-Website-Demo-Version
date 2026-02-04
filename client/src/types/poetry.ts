// client/src/types/poetry.ts
export interface ArticleData {
    title: string;
    content: string;
    writer: string;
    template: 'VINTAGE' | 'CLEAN';
    type: 'ESSAY' | 'RELAY';
}

export interface ArticleListResponse {
    id: number;
    title: string;
    writer: string;
}