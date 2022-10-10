import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve('src') }],
  },
  server: {
    proxy: {
      '^/proxy/.*': {
        target: 'http://192.168.31.185:60603',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },
});
