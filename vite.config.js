// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // ← Все в public/
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },

  // Автоматично визначає хостинг
  base: process.env.NODE_ENV === 'production'
    ? (process.env.VERCEL ? '/' : '/ITschool/') // Vercel → '/', GitHub Pages → '/ITschool/'
    : '/',
});