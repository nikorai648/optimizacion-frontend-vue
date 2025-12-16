<!-- src/views/HomeView.vue -->
<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <img
        src="/img/logo-carran.jpg"
        alt="Logo"
        width="90"
        height="90"
        class="rounded shadow-sm mb-3"
        style="object-fit: cover;"
      />
      <h2 class="fw-bold">Panel Principal</h2>
      <p class="text-muted mb-0">Accede a los módulos del sistema.</p>
    </div>

    <div class="row g-4">
      <div v-for="c in cards" :key="c.path" class="col-12 col-sm-6 col-lg-4">
        <RouterLink :to="c.path" class="text-decoration-none">
          <div class="card h-100 shadow-sm">
            <img :src="c.img" :alt="c.title" class="card-img-top" style="height:180px;object-fit:cover;" />
            <div class="card-body d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0">{{ c.title }}</h5>
              <span class="btn btn-sm btn-primary">Entrar</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const cards = [
  { title: "Accidentes", path: "/accidentes", img: "/img/accidente.webp" },
  { title: "Asistencias", path: "/asistencias", img: "/img/asistencia.webp" },
  { title: "Desempeño", path: "/desempenos", img: "/img/desempeno.jpg" },
  { title: "Eficiencia", path: "/eficiencias", img: "/img/eficiencia.jpeg" },
  { title: "Sueldos", path: "/sueldos", img: "/img/sueldo.webp" },
  { title: "Trabajadores", path: "/trabajadores", img: "/img/trabajador.jpg" },
];
</script>
