import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/knoxville/', // Make sure this matches your GitHub repo name exactly
  build: {
    outDir: 'dist', // default, but make it explicit
    emptyOutDir: true,
  },
});
