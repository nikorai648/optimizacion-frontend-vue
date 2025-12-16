<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const cards = [
  {
    title: "Accidentes",
    desc: "Registro y control de accidentes laborales.",
    to: "/accidentes",
    img: "/img/accidente.webp",
  },
  {
    title: "Asistencias",
    desc: "Control diario de asistencia del personal.",
    to: "/asistencias",
    img: "/img/asistencia.webp",
  },
  {
    title: "Desempeño",
    desc: "Evaluación cualitativa del desempeño.",
    to: "/desempenos",
    img: "/img/desempeno.jpg",
  },
  {
    title: "Eficiencia",
    desc: "Indicadores de productividad y eficiencia.",
    to: "/eficiencias",
    img: "/img/eficiencia.jpg",
  },
  {
    title: "Sueldos",
    desc: "Cálculo de sueldos y resumen mensual.",
    to: "/sueldos",
    img: "/img/sueldo.webp",
  },
  {
    title: "Trabajadores",
    desc: "Gestión de trabajadores y datos base.",
    to: "/trabajadores",
    img: "/img/trabajador.jpg",
  },
];
</script>

<template>
  <div class="container py-4">

    <div class="mb-4">
      <h1 class="mb-1">Panel Principal</h1>
      <p class="text-muted mb-0">
        Selecciona un módulo para administrar la información del sistema.
      </p>
    </div>

    <div class="row g-4">
      <div v-for="c in cards" :key="c.to" class="col-12 col-sm-6 col-lg-4">
        <div
          class="card h-100 shadow-sm dashboard-card"
          role="button"
          @click="router.push(c.to)"
        >
          <div class="card-body d-flex gap-3 align-items-center">
            <div class="icon-wrap">
              <img :src="c.img" :alt="c.title" class="icon-img" />
            </div>

            <div class="flex-grow-1">
              <h5 class="card-title mb-1">{{ c.title }}</h5>
              <p class="card-text text-muted mb-0">{{ c.desc }}</p>
            </div>
          </div>

          <div class="card-footer bg-transparent border-0 pt-0 pb-3 px-3">
            <button class="btn btn-primary btn-sm w-100" @click.stop="router.push(c.to)">
              Ir a {{ c.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Card clickeable con efecto */
.dashboard-card {
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.dashboard-card:hover {
  transform: translateY(-2px);
}

/* Contenedor del icono */
.icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  overflow: hidden;
  flex: 0 0 auto;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Icono ajustado sin deformarse */
.icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
