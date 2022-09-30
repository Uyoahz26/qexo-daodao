import { defineConfig, loadEnv } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import Path from 'path';
import WindiCSS from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        '@': `${Path.resolve(__dirname, 'src')}`,
      },
    },
    plugins: [
      Uni(),
      WindiCSS(),
      MiniProgramTailwind(),
      AutoImport({
        dts: false,
        imports: [
          'vue',
          {
            '@dcloudio/uni-app': ['onLaunch', 'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload'],
          },
        ],
        resolvers: [],
      }),
      Components({
        dts: false,
        resolvers: [],
      }),
    ],
    define: {
      __BUILDDATE__: JSON.stringify(new Date()),
    },
    build: {
      rollupOptions: {
        external: ['@dcloudio/vite-plugin-uni'],
      },
    },
  });
};
