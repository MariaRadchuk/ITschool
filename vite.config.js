import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/ITschool/' : '/',
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
  };
});