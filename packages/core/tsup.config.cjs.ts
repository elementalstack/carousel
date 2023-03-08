import { defineConfig } from 'tsup';
import { tsupBase } from '../../config/tsupBase';

export default defineConfig({
  ...tsupBase,
  outDir: 'dist/cjs',
  format: ['cjs'],
});
