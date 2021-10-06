import { PluginObject } from 'vue'
import EchartsPlus from './KiEchartsPlus.vue'

EchartsPlus.install = (vue) => {
  vue.component(EchartsPlus.name, EchartsPlus)
}

interface Column {
  name: string,
  color?: string
}

export interface EchartsPlugin {
  name: string,
  resetOption(cols: Column[], data: Array<any>): void
}

EchartsPlus.use = <EchartsPlugin>(plugin: PluginObject<EchartsPlugin>) => {
  if (plugin.name in EchartsPlus.plugins) {
    throw Error(`pluginName is exist ${plugin.name} 该插件名已存在`)
  }
  EchartsPlus.plugins[plugin.name] = plugin
  return EchartsPlus
}

export default EchartsPlus