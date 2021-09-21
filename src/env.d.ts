declare module '*.vue' {
  import { VueConstructor, ComponentOptions } from 'vue'
  const component: ComponentOptions<any> & { install(vue: VueConstructor): void }
  export default component
}
