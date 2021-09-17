import resolve from 'rollup-plugin-node-resolve' // 查找和打包node_modules中的第三方模块
import commonjs from 'rollup-plugin-commonjs' // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理，识别require
import typescript from 'rollup-plugin-typescript' // 解析TypeScript
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer' // 自动加前缀，通过.browserslistrc 配置支持的浏览器范围
import cssnano from 'cssnano' // 压缩css
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser' // 代码整体压缩

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'


export default {
  input: 'src/index.ts', // 打包入口
  output: { // 打包出口
    file: 'lib/kidar-common.js', // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  },
  plugins: [ // 打包插件
    postcss({
      plugins: [autoprefixer(), cssnano()],
      extract: 'lib/style/index.css' // 将css抽离成单独的文件
    }),
    vue(),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    serve({
      contentBase: '',  //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020   //端口号，默认10001
    }),
    livereload('dist')   //watch dist目录，当目录中的文件发生变化时，刷新页面
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue'
  ]
}