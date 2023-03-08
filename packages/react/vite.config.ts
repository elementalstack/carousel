import { defineConfig, mergeConfig } from 'vite';

import react from '@vitejs/plugin-react';
import { viteBaseConfig } from '../../config/viteBase';

const config = mergeConfig(viteBaseConfig, {
  test: {
    setupFiles: '../../config/setupTest.ts',
  },
});

export default defineConfig({
  ...config,
  plugins: [react()],
});
