import EchartsPlus from './EchartsPlus.vue'

EchartsPlus.install = (vue) => {
  vue.component(EchartsPlus.name, EchartsPlus)
}

interface Column {
  name: string,
  color?: string
}

export interface EchartsPlugin {
  resetOption(cols: Column[], data: Array<any>): void
}

EchartsPlus.use = (pluginName, plugin: EchartsPlugin) => {
  if (pluginName in EchartsPlus.plugins) {
    throw Error(`pluginName is exist ${pluginName} 该插件名已存在`)
  }
  EchartsPlus.plugins[pluginName] = plugin
}

export default EchartsPlus