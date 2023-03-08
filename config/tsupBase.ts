import { Options } from 'tsup';

export const tsupBase: Options = {
  entry: ['src'],
  target: 'es2019',
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
}
