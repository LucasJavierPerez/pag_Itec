import { defineConfig } from 'vite';

// GitHub Pages serves the site from /<repo>/; local dev stays at /
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/pag_Itec/' : '/',
}));
