import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '.', // корінь проєкту
  publicDir: 'pages', // папка для статичних ресурсів
  build: {
    outDir: 'dist', // папка для продакшену
    sourcemap: true, // для дебагу
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        programs: path.resolve(__dirname, 'pages/programs.html'),
        council: path.resolve(__dirname, 'pages/council.html'),
        access: path.resolve(__dirname, 'pages/access.html'),
        notfound: path.resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    port: 5173, // стандартний порт для Vite
    open: true, // відкриває браузер автоматично
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'assets'), // зручний alias для assets
    },
  },
  css: {
    devSourcemap: true, // для дебагу CSS
  },
})