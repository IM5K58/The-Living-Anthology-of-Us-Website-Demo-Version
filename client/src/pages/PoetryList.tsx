import { useEffect, useState } from 'react';
import { getPoetryList } from '../api/poetryApi';
import type { Poetry } from '../types/poetry';

const PoetryList = () => {
    const [poetries, setPoetries] = useState<Poetry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPoetryList();
                setPoetries(data);
            } catch (err) {
                console.error(err);
                setError('데이터를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">시 목록</h2>
            <div className="grid gap-4">
                {poetries.map((poetry) => (
                    <div key={poetry.id} className="border p-4 rounded shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold text-lg">{poetry.title || '무제'}</h3>
                        <p className="text-gray-600 mt-2 whitespace-pre-line">{poetry.content}</p>
                        <span className="text-sm text-gray-400 block mt-4">- {poetry.author || '익명'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PoetryList;