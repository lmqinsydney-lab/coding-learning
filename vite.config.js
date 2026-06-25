import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    // 相对路径，兼容 GitHub Pages 项目站点子路径（/coding-learning/）
    base: './',
    plugins: [react()],
    server: { port: 5180, open: false },
});
