import { createRouter, createWebHistory } from "vue-router";
import AcercaDe from "../views/AcercaView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/ClimaView.vue"),
  },
  {
    path: "/lugar/:ciudad",
    name: "Detalle",
    component: () => import("../views/DetallesView.vue"),
    props: true,
  },
  {
    path: "/acerca",
    name: "acerca",
    component: AcercaDe,
    alias: ["/about", "/acerca-de", "/info"],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;