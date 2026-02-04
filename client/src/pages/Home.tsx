import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- 화살표 아이콘 ---
const ArrowLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
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
    { id: 1, title: "비일상의 일상화", author: "오인겸", content: "우리는 매일 똑같은 하루를 보내지만\n그 속에서 작은 틈을 발견할 때\n비로소 여행이 시작된다.", color: "paper-variant-1" },
    { id: 2, title: "오후의 홍차", author: "김소연", content: "오후 3시의 햇살은\n가장 너그러운 표정을 짓는다.", color: "paper-variant-3" },
    { id: 3, title: "산책", author: "이석원", content: "걷는다는 것은\n나를 둘러싼 풍경과\n대화하는 일이다.", color: "paper-variant-2" },
];

const Home = () => {
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(0);
    const [exitDirection, setExitDirection] = useState(1);

    // --- 핸들러 ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLeftDragEnd = (_: any, info: any) => {
        const swipeDistance = info.offset.x;
        const swipeThreshold = 50;
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (leftIndex < LEFT_STORIES.length) {
                setExitDirection(swipeDistance > 0 ? 1 : -1);
                setLeftIndex(prev => prev + 1);
            }
        }
    };

    const nextRightSlide = () => {
        setRightIndex((prev) => (prev + 1) % RIGHT_STORIES.length);
    };
    const prevRightSlide = () => {
        setRightIndex((prev) => (prev - 1 + RIGHT_STORIES.length) % RIGHT_STORIES.length);
    };

    return (
        <div className="min-h-screen bg-[#fffdf5] text-stone-800 font-serif flex flex-col items-center">

            {/* --- 헤더 --- */}
            <header className="w-full max-w-7xl px-6 pt-10 pb-4 mb-8 md:mb-12 relative z-0">
                <div className="flex justify-between items-end border-b border-red-400 pb-4">
                    <div className="relative">
                        <span className="absolute -left-3 -top-2 text-red-400 text-2xl font-serif">*</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight ml-2">
                            살아있는 우리들의 시집
                        </h1>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-serif text-stone-500">since. 2022</span>
                        <Link to="/list" className="text-sm text-stone-600 hover:text-red-500 transition-colors flex items-center gap-1">
                            목록 보기 <span className="text-xs">→</span>
                        </Link>

                        {/* [추가] 글쓰기 링크 */}
                        <Link to="/write" className="text-sm font-bold text-stone-800 hover:text-red-500 transition-colors flex items-center gap-1 border-b border-stone-800 hover:border-red-500 pb-0.5">
                            글 남기기 <span className="text-xs">✎</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- 메인 콘텐츠 (Grid Layout) --- */}
            <main className="w-full max-w-7xl px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center pb-20 relative">

                {/* [왼쪽] 떼어내는 원고지 (드래그 영역) */}
                <div className="flex flex-col w-full relative z-50 group">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-sm text-stone-500">오늘의 이야기</h3>
                        <span className="text-xs text-stone-400">Drag to peel &rarr;</span>
                    </div>

                    {/* [수정] aspect-[3/4] -> aspect-[4/5] 로 변경하여 세로 길이 축소 */}
                    <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto perspective-1000">
                        <AnimatePresence>
                            {LEFT_STORIES.map((story, index) => {
                                if (index < leftIndex) return null;
                                const isTop = index === leftIndex;
                                const stackOffset = index - leftIndex;
                                const scale = 1 - stackOffset * 0.02;
                                const rotate = stackOffset % 2 === 0 ? stackOffset * 1 : stackOffset * -1;
                                const yOffset = stackOffset * 2;

                                return (
                                    <motion.div
                                        key={story.id}
                                        className={`absolute top-0 left-0 w-full h-full p-8 md:p-12 flex flex-col justify-center text-left grid-pattern paper-card-base ${story.color}`}
                                        style={{
                                            zIndex: LEFT_STORIES.length - index,
                                            cursor: isTop ? 'grab' : 'default',
                                        }}
                                        drag={isTop}
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.6}
                                        onDragEnd={isTop ? handleLeftDragEnd : undefined}
                                        initial={{ scale, rotate, y: yOffset }}
                                        animate={{ scale, rotate, y: yOffset }}
                                        exit={{
                                            x: exitDirection * 800,
                                            y: 100,
                                            rotate: exitDirection * 20,
                                            opacity: 0,
                                            transition: { duration: 0.5, ease: "easeInOut" }
                                        }}
                                        whileDrag={{ scale: 1.05, rotate: 0, zIndex: 9999 }}
                                        whileTap={{ cursor: 'grabbing' }}
                                    >
                                        <div className="relative z-10 h-full flex flex-col">
                                            <div className="mb-auto pt-4">
                                                <span className="inline-block px-2 py-1 border border-stone-800 text-xs font-bold mb-4">
                                                    No. {story.id}
                                                </span>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-bold leading-snug text-stone-800 mb-8 pointer-events-none select-none">
                                                {story.title}
                                            </h2>
                                            <p className="whitespace-pre-line text-lg leading-loose text-stone-700 font-serif pointer-events-none select-none">
                                                {story.content}
                                            </p>

                                            <div className="mt-auto pt-8 border-t border-stone-300/50 text-right">
                                                <p className="text-sm font-bold text-stone-500 pointer-events-none select-none">
                                                    지은이 . {story.author}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* 완료 상태 */}
                        {leftIndex === LEFT_STORIES.length && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 text-center border-2 border-dashed border-stone-300 rounded-sm bg-stone-50/50">
                                <p className="mb-4 text-stone-500">모든 이야기를 읽으셨습니다.</p>
                                <button onClick={() => setLeftIndex(0)} className="px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition shadow-lg text-sm">
                                    처음부터 다시 놓기
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                {/* [오른쪽] 책장 넘기는 효과 */}
                <div className="flex flex-col w-full relative z-0">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-sm text-stone-500">우리들의 이야기</h3>
                        <div className="flex gap-2">
                            <button onClick={prevRightSlide} className="p-1 hover:bg-stone-200 rounded-full transition"><ArrowLeft /></button>
                            <button onClick={nextRightSlide} className="p-1 hover:bg-stone-200 rounded-full transition"><ArrowRight /></button>
                        </div>
                    </div>

                    {/* [수정] aspect-[3/4] -> aspect-[4/5] 로 변경 */}
                    <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto flex items-center justify-center">
                        <div className="relative w-full h-full perspective-1000">
                            <AnimatePresence mode='wait' initial={false}>
                                <motion.div
                                    key={RIGHT_STORIES[rightIndex].id}
                                    className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center z-10 grid-pattern paper-card-base origin-left ${RIGHT_STORIES[rightIndex].color}`}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    initial={{ rotateY: -90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    exit={{ rotateY: 90, opacity: 0, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="h-full flex flex-col relative z-10">
                                        <div className="flex justify-between items-start mb-10 border-b border-stone-800/20 pb-4">
                                            <span className="text-stone-400 font-serif italic text-lg">Essay</span>
                                            <span className="text-xs text-stone-400 border border-stone-300 px-2 py-0.5 rounded-full">Page {rightIndex + 1}</span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-stone-800 mb-6">
                                            {RIGHT_STORIES[rightIndex].title}
                                        </h2>
                                        <p className="whitespace-pre-line text-stone-700 leading-relaxed text-lg">
                                            {RIGHT_STORIES[rightIndex].content}
                                        </p>

                                        <div className="mt-auto pt-6 text-right">
                                            <span className="text-sm font-bold text-stone-500">
                                                By {RIGHT_STORIES[rightIndex].author}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-900/10 to-transparent pointer-events-none z-20 mix-blend-multiply"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none z-20"></div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center items-center gap-1 text-xs text-stone-400 font-serif">
                        {RIGHT_STORIES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setRightIndex(idx)}
                                className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                                    idx === rightIndex ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-200'
                                }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Home;