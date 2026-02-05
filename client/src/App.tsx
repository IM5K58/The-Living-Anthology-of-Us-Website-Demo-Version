// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PoetryWrite from './pages/PoetryWrite';
import PoetryList from "./pages/PoetryList.tsx"; // 추가
import PoetryDetail from './pages/PoetryDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CreatorIntro from './pages/CreatorIntro'; // [추가]

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<PoetryWrite />} />
                <Route path="/list" element={<PoetryList />} />
                <Route path="/poetry/:id" element={<PoetryDetail />} />
                {/* 추가 경로는 여기에 라우트만 작성 */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/creator" element={<CreatorIntro />} />
            </Routes>
        </Router>
    );
}

export default App;