// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PoetryList from './pages/PoetryList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<PoetryList />} />
                {/* 추가 경로는 여기에 라우트만 작성 */}
            </Routes>
        </Router>
    );
}

export default App;