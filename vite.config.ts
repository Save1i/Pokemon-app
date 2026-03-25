import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // quietDeps tells the legacy Sass API to ignore warnings in node_modules
        quietDeps: true,
      }
    }
  }
})