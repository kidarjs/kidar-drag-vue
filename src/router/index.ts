import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const lazyLoad = (name: string) => () => import(/* @vite-ignore */`../views/${name}.vue`)
const lazyFolderLoad = (folder: string, name: string) => () => import(/* @vite-ignore */`../views/${folder}/${name}.vue`)

export const screenRoutes = [
  { path: "screen-finance", name: "金融实况", component: lazyFolderLoad('echartsplus', 'FinanceScreen') },
  { path: "screen-electricity", name: "全国用电分布", component: lazyFolderLoad('echartsplus', 'ElectricityScreen') }
]

export const echartsPluginsRoutes = [
  { path: "plugins-ring", name: "圆环图", component: lazyFolderLoad('echartsplus', 'Ring') },
  { path: "plugins-bar", name: "条形图", component: lazyFolderLoad('echartsplus', 'Bar') },
  { path: "plugins-line", name: "折线图", component: lazyFolderLoad('echartsplus', 'Line') },
  { path: "plugins-bar-line", name: "条形、折线图", component: lazyFolderLoad('echartsplus', 'BarLine') },
  { path: "plugins-area", name: "面积图", component: lazyFolderLoad('echartsplus', 'Area') }
]

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "介绍",
    component: Home,
  },
  {
    path: "/drag",
    name: "拖拽盒子",
    component: lazyFolderLoad('drag', 'index'),
  },
  {
    path: "/echartsplus",
    name: "EchartsPlus",
    component: () => import("@/views/echartsplus/index.vue"),
    children: [
      ...screenRoutes,
      ...echartsPluginsRoutes
    ]
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  base: import.meta.env.BASE_URL,
  mode: "hash",
  routes,
});

export default router;
