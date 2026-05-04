import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': 'http://localhost:5050',
      '/stop': 'http://localhost:5050',
      '/clear': 'http://localhost:5050',
      '/status': 'http://localhost:5050',
    },
  },
})
