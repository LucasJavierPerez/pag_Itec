import { defineConfig } from 'vite';

// Root path by default (Cloudflare, Netlify, local). For GitHub Pages build with BASE_PATH=/pag_Itec/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
});
