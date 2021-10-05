import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import WindiCSS from "vite-plugin-windicss";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const config = defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/kidar-vue/' : '/',
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
    dedupe: ["vue-demi"],
  },

  build: {
    minify: true
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
