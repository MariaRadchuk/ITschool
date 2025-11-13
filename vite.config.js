// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // ← Все в public/
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  base: '/ITschool/',
});