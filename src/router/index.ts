import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Machine from "../views/Machine.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Machine",
    component: () =>
      import(/* webpackChunkName: "machine" */ "../views/Machine.vue"),
  },
  {
    path: "/materials",
    name: "Materials",
    component: () =>
      import(/* webpackChunkName: "materials" */ "../views/Materials.vue"),
  },
  {
    path: "/cutters",
    name: "Cutters",
    component: () =>
      import(/* webpackChunkName: "cutters" */ "../views/Cutters.vue"),
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: () =>
      import(/* webpackChunkName: "calculator" */ "../views/Calculator.vue"),
  },
  {
    path: "/optimization",
    name: "Optimization",
    component: () =>
      import(/* webpackChunkName: "optimization" */ "../views/Optimization.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
