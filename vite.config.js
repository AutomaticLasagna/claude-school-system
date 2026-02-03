import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5174,
    fs: {
      // Allow serving files from project root (for data/ directory)
      allow: ['..']
    }
  }
})
