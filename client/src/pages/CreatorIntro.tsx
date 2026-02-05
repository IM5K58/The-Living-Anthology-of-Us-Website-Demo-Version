import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreatorIntro: React.FC = () => {
    const navigate = useNavigate();

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
                <h1 className="text-2xl font-bold text-stone-800">제작자 소개</h1>
            </div>

            {/* 메인 종이 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-2xl bg-[#fdfbf6] shadow-xl md:p-16 p-8 flex flex-col paper-texture border border-stone-200"
            >
                {/* 편지 내용 */}
                <div className="leading-loose text-stone-700 text-lg">
                    <p className="mb-8">안녕하세요.</p>

                    <p className="mb-6">
                        '살아있는 우리들의 시집'을 개발한 <strong>오인겸</strong>입니다.
                    </p>

                    <p className="mb-6">
                        이 공간은 누구나 마음속에 품고 있는 작은 시 한 편을
                        꺼내어 놓을 수 있는 따뜻한 쉼터가 되기를 바라며 만들었습니다.
                    </p>

                    <p className="mb-6">
                        화려하고 빠른 세상 속에서, <br/>
                        잠시 멈춰 서서 서로의 문장을 읽고 위로받는 시간이 되셨으면 좋겠습니다.
                    </p>

                    <p className="mb-12">
                        당신의 이야기가 이곳에서 아름다운 꽃으로 피어오르기를 응원합니다.
                    </p>

                    <div className="text-right">
                        <p className="text-base font-bold text-stone-800">오인겸 드림</p>
                        <p className="text-xs text-stone-400 mt-1">gitue11@gmail.com</p>
                    </div>
                </div>

                {/* (선택) 하단 장식 선 */}
                <div className="w-full h-[1px] bg-stone-200 mt-12 mb-6"></div>

                <div className="text-center text-xs text-stone-400">
                    Developed with React & Spring Boot
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

export default CreatorIntro;