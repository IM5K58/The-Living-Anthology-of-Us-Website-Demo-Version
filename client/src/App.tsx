// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PoetryWrite from './pages/PoetryWrite';
import PoetryList from "./pages/PoetryList.tsx"; // 추가
import PoetryDetail from './pages/PoetryDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<PoetryWrite />} />
                <Route path="/list" element={<PoetryList />} />
                <Route path="/poetry/:id" element={<PoetryDetail />} />
                {/* 추가 경로는 여기에 라우트만 작성 */}
            </Routes>
        </Router>
    );
}

export default App;