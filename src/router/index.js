import { createRouter, createWebHistory } from "vue-router";
import AcercaDe from "../views/AcercaView.vue";
import { useAuthStore } from "../stores/authStore";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/ClimaView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true },
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


router.beforeEach((to) => {

  const auth = useAuthStore()

  console.log("usuario actual:", auth.user)
  // bloquear login/register si ya está logueado
  if (to.meta.guestOnly && auth.user) {
    return "/"
  }

  // bloquear rutas protegidas
  if (to.meta.requiresAuth && !auth.user) {
    return "/login"
  }

})


export default router;
