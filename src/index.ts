import Drag from "./drag"
import EchartsPlus from "./echartsplus"

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  Vue.use(Drag)
  Vue.use(EchartsPlus)
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/**
 *按需导出
 **/
export {
  Drag,
  EchartsPlus
}

export default install  //umd
