<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAsistencias, deleteAsistencia } from "../api/asistencias";

const router = useRouter();
const asistencias = ref([]);
const loading = ref(true);
const error = ref("");

const handle401 = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
};

const cargar = async () => {
  loading.value = true;
  error.value = "";
  try {
    asistencias.value = await getAsistencias();
  } catch (e) {
    if (e?.status === 401) return handle401();
    error.value = e?.message || "Error al cargar asistencias";
  } finally {
    loading.value = false;
  }
};

const irNueva = () => router.push("/asistencias/nueva");
const irEditar = (id) => router.push(`/asistencias/${id}`);

const eliminar = async (id) => {
  if (!confirm("¿Eliminar asistencia?")) return;
  try {
    await deleteAsistencia(id);
    asistencias.value = asistencias.value.filter((a) => a.id !== id);
  } catch (e) {
    if (e?.status === 401) return handle401();
    alert(e?.message || "Error al eliminar");
  }
};

onMounted(cargar);
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/asistencia.webp" class="icono-listado" alt="Asistencias" />
        <h3 class="mb-0">Asistencias</h3>
      </div>
      <button class="btn btn-primary" @click="irNueva">Nueva</button>
    </div>

    <div v-if="loading">Cargando asistencias...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Estado</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in asistencias" :key="a.id">
          <td>{{ a.trabajador_rut }}</td>
          <td>{{ a.trabajador_nombre }}</td>
          <td>{{ a.fecha }}</td>
          <td>{{ a.estado }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(a.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(a.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="asistencias.length === 0">
          <td colspan="5">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
