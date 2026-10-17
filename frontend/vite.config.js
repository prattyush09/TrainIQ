import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import process from 'node:process'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
