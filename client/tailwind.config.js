/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#e66a5e", // 기존 포인트 컬러 (붉은색)
                "background-light": "#fffdf5",
                // 새로 추가하는 종이 색상들
                paper: {
                    base: "#fffcf0",  // 기본 미색
                    warm: "#f7f5e6",  // 약간 더 누런 종이
                    aged: "#f0ece0",  // 오래된 종이 느낌
                }
            },
            fontFamily: {
                display: ["MaruBuri", "serif"],
                serif: ["MaruBuri", "serif"],
            },
        },
    },
    plugins: [],
}