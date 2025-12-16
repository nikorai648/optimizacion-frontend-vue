<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAccidentes, deleteAccidente } from "../api/accidentes";

const router = useRouter();

const accidentes = ref([]);   // ✅
const loading = ref(true);    // ✅
const error = ref("");        // ✅

function handle401() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
}

const cargar = async () => {
  loading.value = true;
  error.value = "";
  try {
    const data = await getAccidentes();
    accidentes.value = Array.isArray(data) ? data : [];
  } catch (e) {
    if (e?.status === 401) return handle401();
    error.value = e?.message || "Error al cargar accidentes";
    accidentes.value = [];
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => router.push("/accidentes/nuevo");
const irEditar = (id) => router.push(`/accidentes/${id}`);

const eliminar = async (id) => {
  if (!confirm("¿Eliminar accidente?")) return;
  try {
    await deleteAccidente(id);
    accidentes.value = accidentes.value.filter((a) => a.id !== id);
  } catch (e) {
    if (e?.status === 401) return handle401();
    alert(e?.message || "No se pudo eliminar");
  }
};

onMounted(cargar);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/accidente.webp" class="icono-listado" alt="Accidentes" />
        <h3 class="mb-0">Accidentes</h3>
      </div>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading" class="alert alert-info">Cargando accidentes...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Gravedad</th>
          <th>Lugar</th>
          <th>Licencia</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in accidentes" :key="a.id">
          <td>{{ a.fecha }}</td>
          <td>{{ a.tipo }}</td>
          <td>{{ a.gravedad }}</td>
          <td>{{ a.lugar }}</td>
          <td>{{ a.requiere_licencia ? "Sí" : "No" }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(a.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(a.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="accidentes.length === 0">
          <td colspan="6" class="text-center">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
