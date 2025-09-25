import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: {
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    exclude: ['artwork.html']
  }
})