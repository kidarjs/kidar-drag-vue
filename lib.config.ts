import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
    dedupe: ["vue-demi"],
  },

  build: {
    minify: true,
    outDir: 'lib',
    lib: {
      entry: 'src/packages/index.ts',
      fileName: 'kidar-vue',
      name: 'KIDAR_VUE'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'echarts'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          echarts: 'echarts'
        }
      }
    }
  },

  plugins: [
    createVuePlugin(),
    Components({
      dirs: ["src/components", "src/packages"],
      resolvers: IconsResolver(),
    }),
    Icons(),
    WindiCSS(),
  ],

  server: {
    port: 8080,
  },
});

export default config;
