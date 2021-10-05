declare module "*.vue" {
  import { VueConstructor } from "vue";
  const component: VueConstructor & { install(vue: VueConstructor) }
  export default component;
}
