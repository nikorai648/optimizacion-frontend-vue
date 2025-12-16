<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getDesempenos, deleteDesempeno } from "../api/desempenos";

const router = useRouter();

const desempenos = ref([]);   // ✅
const loading = ref(true);    // ✅
const error = ref("");        // ✅

const cargar = async () => {
  loading.value = true;
  error.value = "";
  try {
    const data = await getDesempenos();
    desempenos.value = Array.isArray(data) ? data : [];
  } catch (e) {
    error.value = e?.message || "Error al cargar desempeños";
    desempenos.value = [];
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => router.push("/desempenos/nuevo");
const irEditar = (id) => router.push(`/desempenos/${id}`);

const eliminar = async (id) => {
  if (!confirm("¿Eliminar desempeño?")) return;
  try {
    await deleteDesempeno(id);
    desempenos.value = desempenos.value.filter((d) => d.id !== id);
  } catch {
    alert("No se pudo eliminar");
  }
};

onMounted(cargar);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/desempeno.jpg" class="icono-listado" alt="Desempeño" />
        <h3 class="mb-0">Desempeño de Trabajadores</h3>
      </div>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading">Cargando desempeños...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>ID</th>
          <th>Quejas</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in desempenos" :key="d.id">
          <td>{{ d.trabajador_rut }}</td>
          <td>{{ d.trabajador_nombre }}</td>
          <td>{{ d.id_desempeno }}</td>
          <td>{{ d.posibles_quejas || "-" }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(d.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(d.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="desempenos.length === 0">
          <td colspan="5" class="text-center">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
