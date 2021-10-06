declare module "*.vue" {
  import { VueConstructor } from "vue";
  const component: VueConstructor & { install(vue: VueConstructor), plugins: Object | Array }
  export default component;
}
