import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api/poetryApi';
import { useNavigate, Link } from 'react-router-dom';
import type { ArticleListResponse } from '../types/poetry';
import { motion } from 'framer-motion';

// 종이 색상 패턴 (순서대로 돌아가며 적용)
const PAPER_VARIANTS = ["paper-variant-1", "paper-variant-2", "paper-variant-3"];

const PoetryList: React.FC = () => {
    const [articles, setArticles] = useState<ArticleListResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles().then(setArticles).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center">
            {/* --- 헤더 (Home과 동일한 디자인) --- */}
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

                        {/* 홈으로 가기 */}
                        <Link to="/" className="text-sm text-stone-600 hover:text-red-500 transition-colors flex items-center gap-1">
                            홈으로 <span className="text-xs">→</span>
                        </Link>

                        {/* 글쓰기 링크 */}
                        <Link to="/write" className="text-sm font-bold text-stone-800 hover:text-red-500 transition-colors flex items-center gap-1 border-b border-stone-800 hover:border-red-500 pb-0.5">
                            글 남기기 <span className="text-xs">✎</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- 메인 콘텐츠: 시 목록 그리드 --- */}
            <main className="w-full max-w-7xl px-4 md:px-12 pb-20">
                <div className="flex justify-between items-end mb-6 px-2">
                    <h3 className="text-sm text-stone-500">전체 작품 목록</h3>
                    <span className="text-xs text-stone-400">Total {articles.length} stories</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {articles.map((article, index) => {
                        // 색상 순환 (1 -> 2 -> 3 -> 1 ...)
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
                                {/* 상단: 번호 및 장식 */}
                                <div className="flex justify-between items-start mb-6">
                                    <span className="inline-block px-2 py-0.5 border border-stone-800 text-[10px] font-bold">
                                        No. {article.id}
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-stone-300/50"></span>
                                </div>

                                {/* 중간: 제목 */}
                                <div className="flex-1 flex flex-col justify-center text-center">
                                    <h2 className="text-2xl font-bold leading-snug text-stone-800 mb-2 break-keep">
                                        {article.title}
                                    </h2>
                                    {/* (내용 미리보기가 있다면 여기에 추가 가능) */}
                                    <div className="w-8 h-[1px] bg-stone-400/30 mx-auto mt-4"></div>
                                </div>

                                {/* 하단: 작성자 */}
                                <div className="mt-auto text-right">
                                    <p className="text-sm font-bold text-stone-500">
                                        <span className="text-xs font-normal text-stone-400 mr-1">written by</span>
                                        {article.writer}
                                    </p>
                                </div>

                                {/* 종이 질감용 오버레이 (선택사항) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-stone-900/5 pointer-events-none rounded-sm"></div>
                            </motion.div>
                        );
                    })}
                </div>

                {articles.length === 0 && (
                    <div className="text-center py-20 text-stone-400">
                        <p>아직 등록된 시가 없습니다.</p>
                        <p className="text-sm mt-2">첫 번째 이야기의 주인공이 되어보세요.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PoetryList;