import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, './src/renderer'),
  plugins: [react()]
})
