import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api/poetryApi';
import { useNavigate, Link } from 'react-router-dom';
import type { ArticleListResponse } from '../types/poetry';
import { motion } from 'framer-motion';

const PAPER_VARIANTS = ["paper-variant-1", "paper-variant-2", "paper-variant-3"];

const PoetryList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleListResponse[]>([]);
    const [page, setPage] = useState(0);         // 현재 페이지 (0부터 시작)
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const navigate = useNavigate();

    // 데이터 불러오기
    useEffect(() => {
        // page가 바뀔 때마다 실행됨
        fetchArticles('ESSAY', page, 6)
            .then((response) => {
                setArticles(response.content);
                setTotalPages(response.totalPages);
            })
            .catch(console.error);
    }, [page]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
            window.scrollTo(0, 0); // 페이지 넘기면 맨 위로 스크롤
        }
    };

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center">
            {/* --- 헤더 --- */}
            <header className="w-full max-w-7xl px-6 pt-10 pb-4 mb-8 md:mb-12 relative z-0">
                <div className="flex justify-between items-end border-b border-red-400 pb-4">
                    <div className="relative cursor-pointer" onClick={() => navigate('/')}>
                        <span className="absolute -left-3 -top-2 text-red-400 text-2xl font-serif">*</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight ml-2">
                            살아있는 우리들의 시집
                        </h1>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-serif text-stone-500">since. 2022</span>
                        <Link to="/" className="text-sm text-stone-600 hover:text-red-500 transition-colors flex items-center gap-1">
                            홈으로 <span className="text-xs">→</span>
                        </Link>
                        <Link to="/write" className="text-sm font-bold text-stone-800 hover:text-red-500 transition-colors flex items-center gap-1 border-b border-stone-800 hover:border-red-500 pb-0.5">
                            글 남기기 <span className="text-xs">✎</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- 메인 콘텐츠 --- */}
            <main className="w-full max-w-7xl px-4 md:px-12 pb-20 flex-1">
                <div className="flex justify-between items-end mb-6 px-2">
                    <h3 className="text-sm text-stone-500">전체 작품 목록</h3>
                    <span className="text-xs text-stone-400">Page {page + 1} of {totalPages}</span>
                </div>

                {/* 리스트 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {articles.map((article, index) => {
                        const variantColor = PAPER_VARIANTS[index % PAPER_VARIANTS.length];
                        return (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                onClick={() => navigate(`/poetry/${article.id}`)}
                                className={`
                                    relative aspect-[4/5] p-8 flex flex-col cursor-pointer
                                    grid-pattern paper-card-base ${variantColor}
                                    shadow-sm hover:shadow-md transition-shadow
                                `}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="inline-block px-2 py-0.5 border border-stone-800 text-[10px] font-bold">
                                        No. {article.id}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-stone-300/50"></span>
                                </div>
                                <div className="flex-1 flex flex-col justify-center text-center">
                                    <h2 className="text-2xl font-bold leading-snug text-stone-800 mb-2 break-keep">
                                        {article.title}
                                    </h2>
                                    <div className="w-8 h-[1px] bg-stone-400/30 mx-auto mt-4"></div>
                                </div>
                                <div className="mt-auto text-right">
                                    <p className="text-sm font-bold text-stone-500">
                                        <span className="text-xs font-normal text-stone-400 mr-1">written by</span>
                                        {article.writer}
                                    </p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-stone-900/5 pointer-events-none rounded-sm"></div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* --- [변경된 부분] 스마트 페이지네이션 컨트롤 --- */}
                {articles.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-12 select-none">
                        {/* 이전 버튼 */}
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="px-3 py-1 text-sm text-stone-500 disabled:text-stone-300 hover:text-stone-800 transition disabled:cursor-not-allowed"
                        >
                            ←
                        </button>

                        {/* 페이지 번호 계산 로직 */}
                        <div className="flex gap-1 md:gap-2">
                            {(() => {
                                const pageNumbers = [];
                                const maxVisiblePages = 5; // 한 번에 보여줄 최대 숫자 개수
                                const halfVisible = Math.floor(maxVisiblePages / 2);

                                let startPage = Math.max(0, page - halfVisible);
                                let endPage = Math.min(totalPages - 1, page + halfVisible);

                                if (page - halfVisible < 0) {
                                    endPage = Math.min(totalPages - 1, endPage + (halfVisible - page));
                                }

                                if (page + halfVisible >= totalPages) {
                                    startPage = Math.max(0, startPage - (page + halfVisible - totalPages + 1));
                                }

                                // 1. 첫 페이지 (1)
                                if (startPage > 0) {
                                    pageNumbers.push(
                                        <button key="first" onClick={() => handlePageChange(0)} className="w-8 h-8 rounded-full text-sm text-stone-600 hover:bg-stone-200 transition">1</button>
                                    );
                                    if (startPage > 1) {
                                        pageNumbers.push(<span key="ellipsis-start" className="w-8 h-8 flex items-center justify-center text-stone-400">...</span>);
                                    }
                                }

                                // 2. 중간 페이지들
                                for (let i = startPage; i <= endPage; i++) {
                                    pageNumbers.push(
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i)}
                                            className={`
                                                w-8 h-8 rounded-full text-sm font-serif transition-all
                                                ${page === i
                                                ? 'bg-stone-800 text-white font-bold'
                                                : 'text-stone-600 hover:bg-stone-200'
                                            }
                                            `}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                }

                                // 3. 마지막 페이지 (End)
                                if (endPage < totalPages - 1) {
                                    if (endPage < totalPages - 2) {
                                        pageNumbers.push(<span key="ellipsis-end" className="w-8 h-8 flex items-center justify-center text-stone-400">...</span>);
                                    }
                                    pageNumbers.push(
                                        <button key="last" onClick={() => handlePageChange(totalPages - 1)} className="w-8 h-8 rounded-full text-sm text-stone-600 hover:bg-stone-200 transition">{totalPages}</button>
                                    );
                                }

                                return pageNumbers;
                            })()}
                        </div>

                        {/* 다음 버튼 */}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages - 1}
                            className="px-3 py-1 text-sm text-stone-500 disabled:text-stone-300 hover:text-stone-800 transition disabled:cursor-not-allowed"
                        >
                            →
                        </button>
                    </div>
                )}

                {articles.length === 0 && (
                    <div className="text-center py-20 text-stone-400">
                        <p>아직 등록된 시가 없습니다.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PoetryList;