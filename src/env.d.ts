declare module '*.vue' {
  import { VueConstructor, ComponentOptions } from 'vue'
  const component: ComponentOptions<any>
    & {
      install(vue: VueConstructor): void,
      use(pluginName: string, plugin: any): void,
      plugins: Object
    }
  export default component
}
