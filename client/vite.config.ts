// client/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 백엔드 서버 주소
        changeOrigin: true,
        // 만약 백엔드 url이 /api로 시작하지 않는다면 아래 rewrite 옵션 사용
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})