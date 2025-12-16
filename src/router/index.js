// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../auth";

// Vistas
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

import TrabajadorListView from "../views/TrabajadorListView.vue";
import TrabajadorFormView from "../views/TrabajadorFormView.vue";

import AsistenciaListView from "../views/AsistenciaListView.vue";
import AsistenciaFormView from "../views/AsistenciaFormView.vue";

import AccidenteListView from "../views/AccidenteListView.vue";
import AccidenteFormView from "../views/AccidenteFormView.vue";

import EficienciaListView from "../views/EficienciaListView.vue";
import EficienciaFormView from "../views/EficienciaFormView.vue";

import DesempenoListView from "../views/DesempenoListView.vue";
import DesempenoFormView from "../views/DesempenoFormView.vue";

import SueldoListView from "../views/SueldoListView.vue";
import SueldoFormView from "../views/SueldoFormView.vue";

const routes = [
  { path: "/login", name: "login", component: LoginView },

  { path: "/", name: "home", component: HomeView, meta: { requiresAuth: true } },

  // Trabajadores
  { path: "/trabajadores", component: TrabajadorListView, meta: { requiresAuth: true } },
  { path: "/trabajadores/nuevo", component: TrabajadorFormView, meta: { requiresAuth: true } },
  { path: "/trabajadores/:id", component: TrabajadorFormView, props: true, meta: { requiresAuth: true } },

  // Asistencias
  { path: "/asistencias", component: AsistenciaListView, meta: { requiresAuth: true } },
  { path: "/asistencias/nueva", component: AsistenciaFormView, meta: { requiresAuth: true } },
  { path: "/asistencias/:id", component: AsistenciaFormView, props: true, meta: { requiresAuth: true } },

  // Accidentes
  { path: "/accidentes", component: AccidenteListView, meta: { requiresAuth: true } },
  { path: "/accidentes/nuevo", component: AccidenteFormView, meta: { requiresAuth: true } },
  { path: "/accidentes/:id", component: AccidenteFormView, props: true, meta: { requiresAuth: true } },

  // Eficiencia
  { path: "/eficiencias", component: EficienciaListView, meta: { requiresAuth: true } },
  { path: "/eficiencias/nueva", component: EficienciaFormView, meta: { requiresAuth: true } },
  { path: "/eficiencias/:id", component: EficienciaFormView, props: true, meta: { requiresAuth: true } },

  // Desempeño
  { path: "/desempenos", component: DesempenoListView, meta: { requiresAuth: true } },
  { path: "/desempenos/nuevo", component: DesempenoFormView, meta: { requiresAuth: true } },
  { path: "/desempenos/:id", component: DesempenoFormView, props: true, meta: { requiresAuth: true } },

  // Sueldos
  { path: "/sueldos", component: SueldoListView, meta: { requiresAuth: true } },
  { path: "/sueldos/nuevo", component: SueldoFormView, meta: { requiresAuth: true } },
  { path: "/sueldos/:id", component: SueldoFormView, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 GUARDIA GLOBAL (igual a React)
router.beforeEach((to) => {
  const auth = useAuth();

  if (to.meta.requiresAuth && !auth.state.isAuthenticated) {
    return { name: "login" };
  }
});

export default router;
