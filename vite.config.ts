import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // Prévia em arquivo único: embute fontes e imagens
    ...(process.env.VITE_PREVIA === '1' ? { assetsInlineLimit: 50_000_000, cssCodeSplit: false } : {}),
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.tsx', 'tests/**/*.test.ts'],
  },
});
