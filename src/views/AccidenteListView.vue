<!-- src/views/AccidenteListView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAccidentes, deleteAccidente } from "../api/accidentes";

const router = useRouter();

const accidentes = ref([]);
const loading = ref(true);
const error = ref("");

function handle401() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
}

const cargarAccidentes = async () => {
  loading.value = true;
  error.value = "";

  try {
    accidentes.value = await getAccidentes();
  } catch (e) {
    console.error(e);

    if (e?.status === 401) {
      handle401();
      return;
    }

    error.value = e?.message || "Error al cargar accidentes";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => router.push("/accidentes/nuevo");
const irEditar = (id) => router.push(`/accidentes/${id}`);

const eliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este accidente?")) return;

  try {
    await deleteAccidente(id);
    accidentes.value = accidentes.value.filter((a) => a.id !== id);
  } catch (e) {
    console.error(e);

    if (e?.status === 401) {
      handle401();
      return;
    }

    alert(e?.message || "No se pudo eliminar el accidente");
  }
};

onMounted(cargarAccidentes);
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="m-0">Accidentes</h3>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading" class="alert alert-info">Cargando accidentes...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else class="table-responsive">
      <table class="table table-sm table-striped align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Gravedad</th>
            <th>Lugar</th>
            <th>Licencia</th>
            <th>Costo</th>
            <th>Reportado a</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="a in accidentes" :key="a.id">
            <td>{{ a.id }}</td>
            <td>{{ a.fecha }}</td>
            <td>{{ a.tipo }}</td>
            <td>{{ a.gravedad }}</td>
            <td>{{ a.lugar }}</td>
            <td>
              <span v-if="a.requiere_licencia">
                Sí ({{ a.dias_licencia ?? 0 }} días)
              </span>
              <span v-else>No</span>
            </td>
            <td>{{ a.costo_estimado ?? "-" }}</td>
            <td>{{ a.reportado_a || "-" }}</td>
            <td class="text-end">
              <button class="btn btn-outline-secondary btn-sm me-2" @click="irEditar(a.id)">
                Editar
              </button>
              <button class="btn btn-danger btn-sm" @click="eliminar(a.id)">
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="accidentes.length === 0">
            <td colspan="9" class="text-center">No hay accidentes registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
