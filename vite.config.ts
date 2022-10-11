import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  /**
   * 获取项目目录
   */
  // @ts-ignore
  const root = process.cwd();
  /**
   * 获取环境变量
   */
  const { VITE_PORT, VITE_GLOB_API_URL } = loadEnv(mode, root);

  return {
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
      vitePluginHtmlEnv({
        compiler: true,
      }),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('src') }],
    },
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT),
      proxy: {
        '^/proxy/.*': {
          target: 'http://192.168.31.185:60603',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ''),
        },
      },
    },
  };
});
