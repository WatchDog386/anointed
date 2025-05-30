import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // for root hosting
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
