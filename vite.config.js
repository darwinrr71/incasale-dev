import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/darwinrr71.github.io/incasale-dev",
  plugins: [react()],
})
