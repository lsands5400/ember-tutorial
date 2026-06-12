import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

const environment = process.env.EMBER_ENV || 'development';

export default defineConfig({
  base: environment === 'production' ? '/ember-tutorial/' : '/',
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});