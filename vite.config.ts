import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const config = ({ mode }) => defineConfig({
  base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
    dedupe: ["vue-demi"],
  },

  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts'],
          'echarts-gl': ['echarts-gl'],
        }
      }
    }
  },

  plugins: [
    createVuePlugin(),
    Components({
      dirs: ["src/components", "src/packages"],
      resolvers: [
        IconsResolver()
      ],
    }),
    Icons(),
    WindiCSS(),
  ],

  server: {
    port: 8080,
    fs: {
      allow: [
        ".."
      ]
    },
    watch: {
      ignored: [
        '!**/node_modules/kidar-vue-drag/**',
        '!**/node_modules/kidar-vue-echarts/**'
      ]
    }
  },
});

export default config;
