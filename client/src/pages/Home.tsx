import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRandomArticles } from '../api/poetryApi';

// [1] 헤더 왼쪽에 들어갈 사진 (경로 확인해주세요!)
import headerImage from '../assets/살아있는 우리들의 시집.png';

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

// --- 데이터 (오른쪽은 고정 데이터 유지) ---
const RIGHT_STORIES = [
    { id: 1, title: "비일상의 일상화", author: "오인겸", content: "우리는 매일 똑같은 하루를 보내지만\n그 속에서 작은 틈을 발견할 때\n비로소 여행이 시작된다.", color: "paper-variant-1" },
    { id: 2, title: "오후의 홍차", author: "김소연", content: "오후 3시의 햇살은\n가장 너그러운 표정을 짓는다.", color: "paper-variant-3" },
    { id: 3, title: "산책", author: "이석원", content: "걷는다는 것은\n나를 둘러싼 풍경과\n대화하는 일이다.", color: "paper-variant-2" },
];

const PAPER_COLORS = ["paper-variant-1", "paper-variant-2", "paper-variant-3"];

interface DisplayStory {
    id: number;
    title: string;
    author: string;
    content: string;
    color: string;
}

const Home = () => {
    const navigate = useNavigate();

    // --- 상태 관리 ---
    const [leftStories, setLeftStories] = useState<DisplayStory[]>([]);
    const [leftIndex, setLeftIndex] = useState(0);
    const [isLoadingLeft, setIsLoadingLeft] = useState(true);

    const [rightIndex, setRightIndex] = useState(0);
    const [exitDirection, setExitDirection] = useState(1);

    // 드래그 판별 ref
    const isDragging = useRef(false);

    // --- 데이터 가져오기 로직 ---
    const fetchStoriesData = async () => {
        try {
            const articles = await fetchRandomArticles('ESSAY', 5);
            if (articles.length === 0) return [];

            return articles.map((article, index) => ({
                id: article.id,
                title: article.title,
                author: article.writer,
                content: article.content,
                color: PAPER_COLORS[index % PAPER_COLORS.length]
            }));
        } catch (error) {
            console.error("Failed to fetch stories:", error);
            return [];
        }
    };

    // 1. 초기 로딩
    useEffect(() => {
        let ignore = false;
        const load = async () => {
            setIsLoadingLeft(true);
            setLeftIndex(0);
            const data = await fetchStoriesData();
            if (!ignore) {
                setLeftStories(data);
                setIsLoadingLeft(false);
            }
        };
        load();
        return () => { ignore = true; };
    }, []);

    // 2. 새로고침
    const handleRefreshLeftStories = async () => {
        setIsLoadingLeft(true);
        setLeftIndex(0);
        const data = await fetchStoriesData();
        setLeftStories(data);
        setIsLoadingLeft(false);
    };

    // --- 핸들러 ---
    const handleLeftDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeDistance = info.offset.x;
        const swipeThreshold = 50;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (leftIndex < leftStories.length) {
                setExitDirection(swipeDistance > 0 ? 1 : -1);
                setLeftIndex(prev => prev + 1);
            }
        }

        setTimeout(() => {
            isDragging.current = false;
        }, 200);
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
                <div className="relative flex justify-between items-end border-b border-red-400 pb-4">

                    {/* [왼쪽] 사진 */}
                    <div className="relative z-10">
                        {headerImage && (
                            <img
                                src={headerImage}
                                alt="Header Logo"
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md shadow-sm border border-stone-200"
                            />
                        )}
                    </div>

                    {/* [중앙] 타이틀 (중앙 정렬) */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                        <div className="relative pointer-events-auto flex items-start">
                            <span className="text-red-400 text-2xl font-serif mr-1 -mt-2">*</span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight text-center">
                                살아있는 우리들의 시집
                            </h1>
                        </div>
                    </div>

                    {/* [오른쪽] 링크 목록 */}
                    <div className="relative z-10 flex flex-col items-end gap-1">
                        <span className="text-xs font-serif text-stone-500">since. 2022</span>
                        <Link to="/list" className="text-sm text-stone-600 hover:text-red-500 transition-colors flex items-center gap-1">
                            목록 보기 <span className="text-xs">→</span>
                        </Link>
                        <Link to="/write" className="text-sm font-bold text-stone-800 hover:text-red-500 transition-colors flex items-center gap-1 border-b border-stone-800 hover:border-red-500 pb-0.5">
                            글 남기기 <span className="text-xs">✎</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- 메인 콘텐츠 (Grid Layout) --- */}
            <main className="w-full max-w-7xl px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center pb-20 relative">

                {/* [왼쪽] 각자의 이야기 */}
                <div className="flex flex-col w-full relative z-50 group">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-sm text-stone-500">각자의 이야기</h3>
                        <span className="text-xs text-stone-400">클릭하여 읽거나, 드래그하여 넘기세요 &rarr;</span>
                    </div>

                    <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto perspective-1000">
                        {isLoadingLeft ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 border border-stone-200 rounded text-stone-400">
                                <p>이야기를 찾는 중...</p>
                            </div>
                        ) : (
                            <>
                                <AnimatePresence>
                                    {leftStories.map((story, index) => {
                                        if (index < leftIndex) return null;

                                        const isTop = index === leftIndex;
                                        const stackOffset = index - leftIndex;
                                        const scale = 1 - stackOffset * 0.02;
                                        const rotate = stackOffset % 2 === 0 ? stackOffset * 1 : stackOffset * -1;
                                        const yOffset = stackOffset * 2;

                                        return (
                                            <motion.div
                                                key={story.id}
                                                onDragStart={() => { isDragging.current = true; }}
                                                onDragEnd={isTop ? handleLeftDragEnd : undefined}
                                                onClick={() => {
                                                    if (isTop && !isDragging.current) {
                                                        navigate(`/poetry/${story.id}`);
                                                    }
                                                }}
                                                className={`absolute top-0 left-0 w-full h-full p-8 md:p-12 flex flex-col justify-center text-left grid-pattern paper-card-base ${story.color}`}
                                                style={{
                                                    zIndex: leftStories.length - index,
                                                    cursor: isTop ? 'grab' : 'default',
                                                }}
                                                drag={isTop}
                                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                                dragElastic={0.6}
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
                                                whileHover={isTop ? { y: yOffset - 5 } : {}}
                                            >
                                                {/* [수정됨] z-10 -> z-30 (배경 질감보다 앞으로 나오게 함) */}
                                                <div className="relative z-30 h-full flex flex-col pointer-events-none">
                                                    <div className="mb-auto pt-4">
                                                        <span className="inline-block px-2 py-1 border border-stone-800 text-xs font-bold mb-4">
                                                            No. {story.id}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl md:text-3xl font-bold leading-snug text-stone-800 mb-8 break-keep">
                                                        {story.title}
                                                    </h2>
                                                    <p className="whitespace-pre-line text-lg leading-loose text-stone-700 font-serif line-clamp-[6]">
                                                        {story.content}
                                                    </p>
                                                    <div className="mt-auto pt-8 border-t border-stone-300/50 text-right">
                                                        <p className="text-sm font-bold text-stone-500">
                                                            지은이 . {story.author}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>

                                {leftStories.length > 0 && leftIndex === leftStories.length && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 text-center border-2 border-dashed border-stone-300 rounded-sm bg-stone-50/50">
                                        <p className="mb-4 text-stone-500">모든 이야기를 읽으셨습니다.</p>
                                        <button
                                            onClick={handleRefreshLeftStories}
                                            className="px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition shadow-lg text-sm"
                                        >
                                            새로운 이야기 만나기
                                        </button>
                                    </div>
                                )}
                                {leftStories.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 border border-stone-200 bg-stone-50">
                                        <p>아직 등록된 이야기가 없습니다.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* [오른쪽] 우리들의 이야기 */}
                <div className="flex flex-col w-full relative z-0">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h3 className="text-sm text-stone-500">우리들의 이야기</h3>
                        <div className="flex gap-2">
                            <button onClick={prevRightSlide} className="p-1 hover:bg-stone-200 rounded-full transition"><ArrowLeft /></button>
                            <button onClick={nextRightSlide} className="p-1 hover:bg-stone-200 rounded-full transition"><ArrowRight /></button>
                        </div>
                    </div>

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
                                    {/* [수정됨] z-10 -> z-30 (오버레이 효과보다 확실히 앞으로) */}
                                    <div className="h-full flex flex-col relative z-30">
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

                                    {/* 오버레이들 (z-20 유지 -> 글자가 z-30이므로 이제 안 가려짐) */}
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

            {/* --- 푸터 (Footer) --- */}
            <footer className="w-full bg-[#fcf9ee] border-t border-stone-200 py-10 mt-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

                    {/* 왼쪽: 로고 및 저작권 */}
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold text-stone-700 flex items-center gap-2">
                            <span className="text-red-400">*</span> 살아있는 우리들의 시집
                        </div>
                        <p className="text-xs text-stone-400 font-serif">
                            &copy; 2026 The Living Anthology of Us. All rights reserved.
                        </p>
                    </div>

                    {/* 오른쪽: 링크 및 정보 */}
                    <div className="flex flex-col md:items-end gap-2 text-sm text-stone-500 font-serif">
                        <div className="flex gap-4">
                            <Link to="/privacy" className="hover:text-stone-800 transition-colors">개인정보처리방침</Link>
                            <span className="text-stone-300">|</span>
                            <Link to="/terms" className="hover:text-stone-800 transition-colors">이용약관</Link>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">
                            제작자: <Link to="/creator" className="hover:text-stone-600 transition-colors underline decoration-stone-300 underline-offset-2">오인겸</Link> | 문의: gitue11@gmail.com
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;