import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center py-20 px-4">
            {/* 상단 네비게이션 */}
            <div className="w-full max-w-3xl mb-8 flex justify-between items-end relative z-10 px-1">
                <button
                    onClick={() => navigate(-1)}
                    className="text-stone-500 hover:text-red-500 transition flex items-center gap-1 text-sm group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> 뒤로가기
                </button>
                <h1 className="text-2xl font-bold text-stone-800">개인정보처리방침</h1>
            </div>

            {/* 메인 종이 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-3xl bg-[#fdfbf6] shadow-xl md:p-16 p-8 flex flex-col paper-texture border border-stone-200"
            >
                <div className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed text-stone-700">
                    <p className="font-bold mb-4">('살아있는 우리들의 시집'이하 '서비스')은(는) 이용자의 개인정보를 중요시하며, "개인정보 보호법"을 준수하고 있습니다.</p>

                    <h3 className="text-lg font-bold mt-6 mb-2">1. 수집하는 개인정보 항목</h3>
                    <p>서비스는 시(글) 작성을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.</p>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>수집항목: 닉네임(필명), 작성한 글의 내용(제목, 본문)</li>
                        <li>수집방법: 홈페이지 내 글쓰기 기능을 통한 직접 입력</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-2">2. 개인정보의 수집 및 이용목적</h3>
                    <p>수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>서비스 제공: 콘텐츠 제공, 글 게시 및 공유 기능 제공</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-2">3. 개인정보의 보유 및 이용기간</h3>
                    <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>보존 항목: 게시글(제목, 내용, 닉네임)</li>
                        <li>보존 이유: 서비스 내 콘텐츠 유지 및 이용자 편의 제공</li>
                        <li>보존 기간: 서비스 종료 시 또는 작성자의 삭제 요청 시까지</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-2">4. 개인정보 관련 문의</h3>
                    <p>개인정보 보호와 관련된 문의사항은 아래의 연락처로 문의해 주시기 바랍니다.</p>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>이메일: <strong>gitue11@gmail.com</strong></li>
                    </ul>
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

export default PrivacyPolicy;