import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Ép Vite quét file liên tục
    },
    host: true, // Cho phép truy cập từ network
    port: 5173,
    allowedHosts: ['mymony.me'],
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
    },
  }
})

