import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      "/api": {
        target: "https://laber-management-app.onrender.com/",
        secure: false,
      },
    },
  },

  build: {
    sourcemap: false,  // ✅ CSS map errors fix होंगी
  },
})
