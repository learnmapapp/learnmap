import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// `base: './'` keeps every asset path relative, so the same build works on a
// web server, from file://, and from inside an IntelliJ plugin (JCEF).
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'node',
  },
});
