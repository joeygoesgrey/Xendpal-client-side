import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/sitemap.xml': {
        target: 'https://api.xendpal.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sitemap.xml/, '/Uploads/sitemap.xml'),
      },
    },
  },
});
