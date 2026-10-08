import { defineConfig } from 'vite';

// Root path by default (Cloudflare, Netlify, local). For GitHub Pages build with BASE_PATH=/pag_Itec/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  // Dev only: forward the realtime endpoints to `npm run dev:server` (wrangler dev on :8787).
  server: {
    proxy: {
      '/ws': { target: 'ws://localhost:8787', ws: true, changeOrigin: true },
      '/health': { target: 'http://localhost:8787', changeOrigin: true },
    },
  },
});
