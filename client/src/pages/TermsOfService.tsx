import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
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
                <h1 className="text-2xl font-bold text-stone-800">이용약관</h1>
            </div>

            {/* 메인 종이 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-3xl bg-[#fdfbf6] shadow-xl md:p-16 p-8 flex flex-col paper-texture border border-stone-200"
            >
                <div className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed text-stone-700">
                    <h3 className="text-lg font-bold mt-2 mb-2">제1조 (목적)</h3>
                    <p>이 약관은 '살아있는 우리들의 시집'(이하 '서비스')이 제공하는 인터넷 서비스의 이용조건 및 절차, 이용자와 서비스의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>

                    <h3 className="text-lg font-bold mt-6 mb-2">제2조 (저작권의 귀속 및 이용제한)</h3>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>이용자가 작성한 게시물(시, 글 등)의 저작권은 해당 게시물의 작성자에게 귀속됩니다.</li>
                        <li>서비스는 이용자가 작성한 게시물을 서비스 내에서 노출, 전송, 배포할 수 있는 권리를 가집니다.</li>
                        <li>비방, 욕설, 음란물 등 미풍양속을 해치는 게시물은 사전 통보 없이 삭제될 수 있습니다.</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-2">제3조 (이용자의 의무)</h3>
                    <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                    <ul className="list-disc pl-5 my-2 space-y-1">
                        <li>타인의 정보 도용</li>
                        <li>서비스에 게시된 정보의 변경</li>
                        <li>서비스가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                        <li>서비스 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-2">제4조 (책임의 한계)</h3>
                    <p>서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 또한 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</p>

                    <p className="mt-8 text-stone-400 text-sm">본 약관은 2026년 2월 5일부터 적용됩니다.</p>
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

export default TermsOfService;