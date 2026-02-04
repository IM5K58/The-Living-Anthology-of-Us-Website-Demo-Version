import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 화살표 아이콘 컴포넌트 (깔끔한 SVG) ---
const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

// --- 데이터 ---
const LEFT_STORIES = [
    { id: 1, title: "풀꽃", author: "나태주", content: "자세히 보아야 예쁘다\n오래 보아야 사랑스럽다\n너도 그렇다", color: "paper-variant-1" },
    { id: 2, title: "별 헤는 밤", author: "윤동주", content: "계절이 지나가는 하늘에는\n가을로 가득 차 있습니다.", color: "paper-variant-2" },
    { id: 3, title: "방문객", author: "정현종", content: "사람이 온다는 건\n실로 어마어마한 일이다.\n그는 그의 과거와 현재와\n그의 미래와 함께 오기 때문이다.", color: "paper-variant-3" },
    { id: 4, title: "서시", author: "윤동주", content: "죽는 날까지 하늘을 우러러\n한 점 부끄럼이 없기를", color: "paper-variant-1" },
    { id: 5, title: "꽃", author: "김춘수", content: "내가 그의 이름을 불러 주었을 때\n그는 나에게로 와서\n꽃이 되었다.", color: "paper-variant-2" }
];

const RIGHT_STORIES = [
    { id: 1, title: "비일상의 일상화", author: "오인겸", content: "우리는 매일 똑같은 하루를 보내지만\n그 속에서 작은 틈을 발견할 때\n비로소 여행이 시작된다.", color: "bg-[#f9f9f9]" },
    { id: 2, title: "오후의 홍차", author: "김소연", content: "오후 3시의 햇살은\n가장 너그러운 표정을 짓는다.", color: "bg-[#f2f0ea]" },
    { id: 3, title: "산책", author: "이석원", content: "걷는다는 것은\n나를 둘러싼 풍경과\n대화하는 일이다.", color: "bg-[#ebebeb]" },
];

function App() {
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(0);
    const [exitDirection, setExitDirection] = useState(1);

    // --- 왼쪽 핸들러 ---
    const handleLeftDragEnd = (_: any, info: any) => {
        const swipeDistance = info.offset.x;
        const swipeThreshold = 100;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (leftIndex < LEFT_STORIES.length) {
                setExitDirection(swipeDistance > 0 ? 1 : -1);
                setLeftIndex(prev => prev + 1);
            }
        }
    };

    // --- 오른쪽 핸들러 ---
    const nextRightSlide = () => {
        setRightIndex((prev) => (prev + 1) % RIGHT_STORIES.length);
    };
    const prevRightSlide = () => {
        setRightIndex((prev) => (prev - 1 + RIGHT_STORIES.length) % RIGHT_STORIES.length);
    };

    return (
        <div className="min-h-screen bg-background-light text-stone-800 p-8 md:p-16 font-serif flex flex-col items-center overflow-hidden">

            {/* --- 헤더 --- */}
            <header className="w-full max-w-5xl mb-20 relative z-10">
                <div className="relative flex justify-center items-end pb-4">
                    <span className="absolute left-0 top-0 text-primary text-4xl font-serif">*</span>
                    <h1 className="text-4xl md:text-5xl font-display text-gray-800 tracking-tight">
                        살아있는 우리들의 시집
                    </h1>
                </div>
                <div className="w-full border-b border-primary flex justify-end items-end">
                    <span className="text-xs font-serif text-stone-600 mb-1">since. 2022</span>
                </div>
            </header>

            {/* --- 메인 콘텐츠 --- */}
            <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 z-0">

                {/* [왼쪽] 떼어내는 원고지 (유지) */}
                <div className="flex flex-col w-full relative">
                    <h3 className="text-sm text-stone-600 mb-6 pl-1 select-none">좌우로 밀어서 떼어내보세요 ↔</h3>

                    <div className="relative w-full aspect-[4/4.5] mx-auto perspective-1000">
                        <AnimatePresence>
                            {LEFT_STORIES.map((story, index) => {
                                if (index < leftIndex) return null;
                                const isTop = index === leftIndex;
                                return (
                                    <motion.div
                                        key={story.id}
                                        className={`absolute top-0 left-0 w-full h-full p-10 flex flex-col justify-center text-left grid-pattern paper-card-base ${story.color}`}
                                        style={{
                                            zIndex: LEFT_STORIES.length - index,
                                            cursor: isTop ? 'grab' : 'default',
                                        }}
                                        drag={isTop}
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.7}
                                        onDragEnd={isTop ? handleLeftDragEnd : undefined}
                                        initial={{ scale: 1, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                                        animate={{ scale: 1, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
                                        exit={{
                                            x: exitDirection * 500,
                                            y: 100,
                                            rotate: exitDirection * 45,
                                            opacity: 0,
                                            transition: { duration: 0.4 }
                                        }}
                                        whileDrag={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                                    >
                                        <h2 className="text-3xl font-display leading-tight text-stone-800 mb-6 pointer-events-none select-none relative z-10">
                                            {story.title}
                                        </h2>
                                        <p className="whitespace-pre-line leading-loose text-stone-600 font-serif pointer-events-none select-none relative z-10">
                                            {story.content}
                                        </p>
                                        <p className="mt-8 text-sm text-stone-400 text-right pointer-events-none select-none relative z-10">- {story.author}</p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* 완료 메시지 */}
                        {leftIndex === LEFT_STORIES.length && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 text-center z-0">
                                <p className="mb-4">모든 이야기를 읽으셨습니다.</p>
                                <button onClick={() => setLeftIndex(0)} className="px-4 py-2 border border-primary/30 text-primary rounded-full hover:bg-primary/5 transition text-sm">
                                    처음부터 다시 읽기
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 왼쪽 인디케이터 */}
                    <div className="flex justify-center gap-2 mt-6">
                        {LEFT_STORIES.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    idx === leftIndex ? 'bg-primary scale-125' : idx < leftIndex ? 'bg-stone-300' : 'bg-stone-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>


                {/* [오른쪽] 책장 넘기는 효과 (수정됨) */}
                <div className="flex flex-col w-full">
                    <h3 className="text-sm text-stone-600 mb-6 pl-1">우리들의 이야기</h3>

                    <div className="relative w-full aspect-[4/3.5] mt-auto md:mt-0 md:aspect-[4/4.5] flex items-center justify-center">

                        {/* 책장 효과를 위한 perspective 설정 */}
                        <div className="relative w-full h-full perspective-1000">
                            <AnimatePresence mode='wait' initial={false}>
                                <motion.div
                                    key={RIGHT_STORIES[rightIndex].id}
                                    className={`absolute inset-0 p-10 flex flex-col justify-center z-10 shadow-sm border border-stone-200 origin-left`} // origin-left가 책장 넘기는 기준점
                                    style={{
                                        backgroundColor: '#fffcf0', // 종이색
                                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
                                        backgroundBlendMode: 'multiply'
                                    }}
                                    // --- 책장 넘기는 애니메이션 ---
                                    initial={{ rotateY: -90, opacity: 0 }} // 닫힌 상태 (왼쪽에서 시작)
                                    animate={{ rotateY: 0, opacity: 1 }}   // 펼쳐진 상태
                                    exit={{ rotateY: 90, opacity: 0, transition: { duration: 0.3 } }} // 넘어가는 상태 (오른쪽으로 사라짐) (취향에 따라 fade out만 할수도 있음)
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // 부드러운 종이 질감 모션
                                >
                                    <h2 className="text-3xl font-display leading-tight text-stone-800 mb-4 relative z-10">
                                        {RIGHT_STORIES[rightIndex].title}
                                    </h2>
                                    <p className="whitespace-pre-line text-stone-600 leading-relaxed relative z-10">
                                        {RIGHT_STORIES[rightIndex].content}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-stone-300/50 flex justify-between items-center relative z-10">
                                        <span className="text-xs text-stone-400">Page {rightIndex + 1}</span>
                                        <span className="text-sm text-stone-500">{RIGHT_STORIES[rightIndex].author}</span>
                                    </div>

                                    {/* 책등 효과 (왼쪽) */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20"></div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* [수정됨] 심플한 화살표 버튼 */}
                        <button
                            onClick={prevRightSlide}
                            className="absolute -left-10 top-1/2 -translate-y-1/2 text-stone-300 hover:text-primary transition-colors hover:scale-110 p-2"
                        >
                            <ArrowLeft />
                        </button>
                        <button
                            onClick={nextRightSlide}
                            className="absolute -right-10 top-1/2 -translate-y-1/2 text-stone-300 hover:text-primary transition-colors hover:scale-110 p-2"
                        >
                            <ArrowRight />
                        </button>
                    </div>

                    {/* 오른쪽 인디케이터 */}
                    <div className="flex justify-center gap-2 mt-6">
                        {RIGHT_STORIES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setRightIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                                    idx === rightIndex ? 'bg-primary scale-125' : 'bg-stone-200 hover:bg-stone-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}

export default App;