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
    content: string;
}

// [추가] Spring Boot Page 객체 구조 대응
export interface PageResponse<T> {
    content: T[];          // 실제 데이터 목록
    totalPages: number;    // 전체 페이지 수
    totalElements: number; // 전체 데이터 수
    number: number;        // 현재 페이지 번호 (0부터 시작)
    first: boolean;
    last: boolean;
    empty: boolean;
}

// [추가] 상세 조회용 응답 타입
export interface ArticleDetailResponse {
    id: number;
    title: string;
    content: string;
    writer: string;
    template: string; // 'VINTAGE' | 'CLEAN'
    type: string;
}