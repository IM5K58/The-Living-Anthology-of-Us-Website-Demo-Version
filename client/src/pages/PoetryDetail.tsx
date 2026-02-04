import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPoetryDetail } from '../api/poetryApi';
import type { ArticleDetailResponse } from '../types/poetry';
import { motion } from 'framer-motion';

const PoetryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<ArticleDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getPoetryDetail(id)
                .then(setArticle)
                .catch((error) => {
                    console.error("Failed to fetch article:", error);
                    alert("글을 불러오지 못했습니다.");
                    navigate('/list');
                })
                .finally(() => setLoading(false));
        }
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center font-serif text-stone-500">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                Loading...
            </motion.div>
        </div>
    );
    if (!article) return null;

    // 템플릿에 따른 스타일 결정
    const isVintage = article.template === 'VINTAGE';
    const themeClass = isVintage ? 'theme-vintage' : 'theme-clean';

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center py-20 px-4">

            {/* 상단 네비게이션 */}
            <div className="w-full max-w-2xl mb-8 flex justify-between items-end relative z-10 px-1">
                <button
                    onClick={() => navigate(-1)}
                    className="text-stone-500 hover:text-red-500 transition flex items-center gap-1 text-sm group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> 뒤로가기
                </button>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">{article.type}</span>
                    <span className="text-xs text-stone-500 font-bold">No. {article.id}</span>
                </div>
            </div>

            {/* 메인 종이 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                // [핵심] 여기서 css 클래스를 동적으로 적용합니다.
                className={`
                    relative w-full max-w-2xl shadow-xl md:p-16 p-8 min-h-[600px] flex flex-col
                    paper-texture ${themeClass}
                `}
            >
                {/* (옵션) 빈티지 모드일 때만 배경에 연하게 격자 무늬 추가 */}
                {isVintage && (
                    <div className="absolute inset-0 grid-pattern opacity-[0.3] pointer-events-none rounded-[4px] mix-blend-multiply"></div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                    {/* 상단 장식 (빈티지일 때만) */}
                    {isVintage && (
                        <div className="w-full flex justify-center mb-10">
                            <div className="w-16 h-[1px] bg-red-900/20"></div>
                        </div>
                    )}

                    {/* 제목 */}
                    <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center leading-normal break-keep">
                        {article.title}
                    </h1>

                    {/* 본문 */}
                    <div className="flex-1">
                        <p className="whitespace-pre-line text-lg md:text-xl leading-loose text-stone-700">
                            {article.content}
                        </p>
                    </div>

                    {/* 하단 작성자 정보 */}
                    <div className="mt-16 text-right pt-6 border-t border-stone-800/10">
                        <p className="text-base text-stone-600 font-bold">
                            <span className="text-xs font-normal text-stone-400 mr-2">Written by</span>
                            {article.writer}
                        </p>
                        {/* 날짜 등이 있다면 여기에 추가 */}
                    </div>
                </div>
            </motion.div>

            {/* 하단 홈 버튼 */}
            <button
                onClick={() => navigate('/')}
                className="mt-12 px-6 py-2 text-stone-400 hover:text-stone-800 border-b border-transparent hover:border-stone-800 transition text-sm"
            >
                홈으로 돌아가기
            </button>
        </div>
    );
};

export default PoetryDetail;