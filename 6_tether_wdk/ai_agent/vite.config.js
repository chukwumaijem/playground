import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  publicDir: 'dist',
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})