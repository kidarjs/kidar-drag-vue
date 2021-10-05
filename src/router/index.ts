import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";
import ENV from '../../.env'

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "拖拽盒子",
    component: Home,
  },
  {
    path: "/about",
    name: "Echarts",
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: About,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  base: ENV.BASE_URL,
  mode: "history",
  routes,
});

export default router;
