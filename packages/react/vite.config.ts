import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';
import { viteBaseConfig } from '../../config/viteBase';
import { mergeConfig } from 'vite';

const config = defineConfig({
  test: {
    setupFiles: ['./config/setupTest.ts'],
  },
  plugins: [react()],
});

export default mergeConfig(viteBaseConfig, config);
