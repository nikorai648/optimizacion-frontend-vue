<!-- src/components/Navbar.vue -->
<script setup>
import { useRouter, RouterLink } from "vue-router";
import { useAuth } from "../auth"; // ajusta la ruta si tu auth está en otro lado

const router = useRouter();
const auth = useAuth();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <!-- LOGO + TITULO -->
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
        <img
          src="/img/logo-carran.jpg"
          alt="logo-carran"
          width="40"
          height="40"
          class="rounded"
          style="object-fit: cover;"
        />
        <span>Optimizacion y Logistica</span>
      </RouterLink>

      <!-- BOTÓN MÓVIL -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Abrir menú"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- LINKS -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><RouterLink class="nav-link" to="/trabajadores">Trabajadores</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/asistencias">Asistencias</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/accidentes">Accidentes</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/eficiencias">Eficiencia</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/desempenos">Desempeño</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/sueldos">Sueldos</RouterLink></li>
        </ul>

        <!-- USUARIO -->
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <span class="navbar-text text-white me-3">
              Hola, {{ auth.state?.username || "admin" }}
            </span>
          </li>
          <li class="nav-item">
            <button class="btn btn-light btn-sm" @click="handleLogout">Salir</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
