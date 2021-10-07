import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const lazyLoad = (name: string) => () => import(/* @vite-ignore */`../views/${name}.vue`)

export const screenRoutes = [
  { path: "screen-finance", name: "金融实况", component: lazyLoad('echartsplus/FinanceScreen') },
  { path: "screen-electricity", name: "全国用电分布", component: lazyLoad('echartsplus/ElectricityScreen') }
]

export const echartsPluginsRoutes = [
  { path: "plugins-ring", name: "圆环图", component: lazyLoad('echartsplus/Ring') },
  { path: "plugins-bar", name: "条形图", component: lazyLoad('echartsplus/Bar') },
  { path: "plugins-line", name: "折线图", component: lazyLoad('echartsplus/Line') },
  { path: "plugins-bar-line", name: "条形、折线图", component: lazyLoad('echartsplus/BarLine') },
  { path: "plugins-area", name: "面积图", component: lazyLoad('echartsplus/Area') }
]

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "首页",
    component: Home,
  },
  {
    path: "/drag",
    name: "拖拽盒子",
    component: lazyLoad('drag/index'),
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
  mode: "history",
  routes,
});

export default router;
