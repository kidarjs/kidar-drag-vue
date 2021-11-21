import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const lazyLoad = (name: string) => () => import(/* @vite-ignore */`../views/${name}.vue`)
const lazyFolderLoad = (folder: string, name: string) => () => import(/* @vite-ignore */`../views/${folder}/${name}.vue`)

export const screenRoutes = [
  { path: "", name: "大屏样例1", component: lazyFolderLoad('echartsplus', 'FinanceScreen') },
  { path: "screen-electricity", name: "大屏样例2", component: lazyFolderLoad('echartsplus', 'ElectricityScreen') }
]

export const echartsPluginsRoutes = [
  { path: "plugins-ring", name: "圆环图", component: lazyFolderLoad('echartsplus', 'Ring') },
  { path: "plugins-bar", name: "条形图", component: lazyFolderLoad('echartsplus', 'Bar') },
  { path: "plugins-line", name: "折线图", component: lazyFolderLoad('echartsplus', 'Line') },
  { path: "plugins-bar-line", name: "条形、折线图", component: lazyFolderLoad('echartsplus', 'BarLine') },
  { path: "plugins-area", name: "面积图", component: lazyFolderLoad('echartsplus', 'Area') },
  { path: "plugins-map", name: "地图", component: lazyFolderLoad('echartsplus', 'Map') },
]

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "介绍",
    component: Home,
  },
  {
    path: "/echartsplus/",
    name: "KidarEcharts",
    component: () => import("@/views/echartsplus/index.vue"),
    children: [
      ...screenRoutes,
      ...echartsPluginsRoutes
    ]
  },
  {
    path: "/drag",
    name: "拖拽盒子",
    component: lazyFolderLoad('drag', 'index'),
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
