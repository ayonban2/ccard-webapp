import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying frontend and backend together, set proxy here
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})