import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoetry } from '../api/poetryApi';
import { motion } from 'framer-motion';
import type { ArticleData } from '../types/poetry'; // [수정] 기존 타입 import

const PoetryWrite = () => {
    const navigate = useNavigate();

    // [수정] ArticleData 인터페이스 사용 (타입 중복 정의 제거)
    const [formData, setFormData] = useState<ArticleData>({
        title: '',
        writer: '',
        content: '',
        template: 'VINTAGE',
        type: 'ESSAY'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // keyof ArticleData로 타입 안전성 확보
    const handleSelect = (key: keyof ArticleData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.writer.trim()) return alert("작가 이름을 입력해주세요.");
        if (!formData.content.trim()) return alert("내용을 입력해주세요.");

        setIsSubmitting(true);
        try {
            // [수정] 타입이 정확히 일치하므로 에러 없음
            await createPoetry(formData);

            alert("소중한 글이 저장되었습니다.");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("저장에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // [수정] 선택된 템플릿에 따라 CSS 클래스 결정
    const themeClass = formData.template === 'CLEAN' ? 'theme-clean' : 'theme-vintage';

    // [수정] 줄 노트 선 색상 (격자는 사라지고 가로줄만 남음)
    // Clean일 때는 아주 연한 회색, Vintage일 때는 조금 더 진한 색
    const lineColor = formData.template === 'CLEAN' ? '#f3f4f6' : '#e7e5e4';

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center py-12 px-4 overflow-x-hidden">

            {/* 헤더 */}
            <header className="w-full max-w-2xl mb-10 flex justify-between items-end border-b border-red-400 pb-4">
                <h1 className="text-3xl font-bold tracking-tight text-stone-800">
                    <span className="text-red-400 mr-2">*</span>
                    새로운 문장 기록하기
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-stone-500 hover:text-red-500 transition-colors"
                >
                    &larr; 돌아가기
                </button>
            </header>

            {/* 입력 폼 */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                {/* [수정] grid-pattern 제거 -> paper-texture 사용, themeClass 적용 */}
                <form onSubmit={handleSubmit} className={`relative w-full p-8 md:p-12 paper-texture ${themeClass} flex flex-col gap-8`}>

                    {/* 종이 질감 오버레이 */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-stone-50/20"></div>

                    <div className="relative z-10 flex flex-col gap-6">

                        {/* 설정 영역 (Type & Template 선택) */}
                        <div className="flex flex-wrap gap-8 mb-2 border-b border-stone-300/50 pb-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Type</span>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSelect('type', 'ESSAY')}
                                        className={`px-3 py-1 text-sm rounded-full border transition-all ${formData.type === 'ESSAY' ? 'bg-stone-800 text-white border-stone-800' : 'text-stone-500 border-stone-300 hover:bg-stone-100'}`}
                                    >
                                        일반 (Essay)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect('type', 'RELAY')}
                                        className={`px-3 py-1 text-sm rounded-full border transition-all ${formData.type === 'RELAY' ? 'bg-stone-800 text-white border-stone-800' : 'text-stone-500 border-stone-300 hover:bg-stone-100'}`}
                                    >
                                        릴레이 (Relay)
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Theme</span>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSelect('template', 'VINTAGE')}
                                        className={`px-3 py-1 text-sm rounded-full border transition-all ${formData.template === 'VINTAGE' ? 'bg-[#fffcf0] text-stone-800 border-stone-400 font-bold ring-1 ring-stone-300' : 'bg-[#fffcf0] text-stone-400 border-stone-200'}`}
                                    >
                                        Vintage
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect('template', 'CLEAN')}
                                        className={`px-3 py-1 text-sm rounded-full border transition-all ${formData.template === 'CLEAN' ? 'bg-white text-stone-800 border-stone-400 font-bold ring-1 ring-stone-300' : 'bg-white text-stone-400 border-stone-200'}`}
                                    >
                                        Clean
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 제목 */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm text-stone-500 font-bold italic">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="제목을 적어주세요"
                                className="w-full bg-transparent border-b-2 border-stone-300 focus:border-red-400 outline-none py-2 text-2xl font-bold placeholder-stone-300 transition-colors"
                                autoComplete="off"
                            />
                        </div>

                        {/* 작가 */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="writer" className="text-sm text-stone-500 font-bold italic">Author</label>
                            <input
                                type="text"
                                id="writer"
                                name="writer"
                                value={formData.writer}
                                onChange={handleChange}
                                placeholder="당신의 이름을 남겨주세요"
                                className="w-full bg-transparent border-b-2 border-stone-300 focus:border-red-400 outline-none py-2 text-lg placeholder-stone-300 transition-colors"
                                autoComplete="off"
                            />
                        </div>

                        {/* 내용 (격자 제거, 줄만 남김) */}
                        <div className="flex flex-col gap-2 mt-4">
                            <label htmlFor="content" className="text-sm text-stone-500 font-bold italic">Content</label>
                            <div className="relative">
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="이곳에 당신의 문장을 기록하세요..."
                                    rows={10}
                                    className="w-full bg-transparent border-none outline-none text-lg leading-loose placeholder-stone-300 resize-none font-serif"
                                    style={{
                                        // 가로 줄만 표시 (격자 세로선 제거됨)
                                        backgroundImage: `linear-gradient(transparent, transparent 31px, ${lineColor} 31px)`,
                                        backgroundSize: '100% 32px',
                                        lineHeight: '32px',
                                        paddingTop: '0px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 버튼 */}
                    <div className="relative z-10 flex justify-end gap-4 mt-4 pt-6 border-t border-stone-200">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 text-stone-500 hover:bg-stone-100 rounded-full transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-2 bg-stone-800 text-[#fffdf5] rounded-full hover:bg-red-400 hover:text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                        >
                            {isSubmitting ? '기록 중...' : '기록하기'}
                        </button>
                    </div>

                </form>
            </motion.main>
        </div>
    );
};

export default PoetryWrite;