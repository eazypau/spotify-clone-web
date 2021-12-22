import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/Error.vue"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../pages/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
