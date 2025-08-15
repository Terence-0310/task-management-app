import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false, // <— cho phép tự chọn cổng khác (5174, 5175, …) nếu 5173 bận
    host: true,
  },
  preview: {
    port: 5173,
    strictPort: false,
    host: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    css: true,
  },
});
