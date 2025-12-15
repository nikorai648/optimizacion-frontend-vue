<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getEficiencia, createEficiencia, updateEficiencia } from "../api/eficiencias";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  trabajador_rut: "",
  trabajador_nombre: "",
  id_eficiencia: "",
  trabajos_completados_en_1_mes: 0,
  sueldo_promedio_informado: 0,
});

const error = ref("");

const handle401 = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
};

onMounted(async () => {
  if (!esEditar.value) return;
  try {
    const data = await getEficiencia(id);
    form.value = {
      trabajador_rut: data.trabajador_rut || "",
      trabajador_nombre: data.trabajador_nombre || "",
      id_eficiencia: data.id_eficiencia ?? "",
      trabajos_completados_en_1_mes: data.trabajos_completados_en_1_mes ?? 0,
      sueldo_promedio_informado: data.sueldo_promedio_informado ?? 0,
    };
  } catch (e) {
    if (e?.status === 401) return handle401();
    error.value = "No se pudo cargar la eficiencia";
  }
});

const guardar = async (e) => {
  e.preventDefault();
  error.value = "";
  try {
    if (esEditar.value) await updateEficiencia(id, form.value);
    else await createEficiencia(form.value);
    router.push("/eficiencias");
  } catch (e2) {
    if (e2?.status === 401) return handle401();
    error.value = "Error al guardar la eficiencia";
  }
};

const cancelar = () => router.push("/eficiencias");
</script>

<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? "Editar Eficiencia" : "Nueva Eficiencia" }}</h3>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form class="row g-3" @submit="guardar">
      <div class="col-md-6">
        <label class="form-label">RUT</label>
        <input v-model="form.trabajador_rut" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input v-model="form.trabajador_nombre" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">ID Eficiencia</label>
        <input type="number" v-model="form.id_eficiencia" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Trabajos (1 mes)</label>
        <input type="number" min="0" v-model="form.trabajos_completados_en_1_mes" class="form-control" />
      </div>

      <div class="col-md-12">
        <label class="form-label">Sueldo promedio</label>
        <input type="number" min="0" v-model="form.sueldo_promedio_informado" class="form-control" />
      </div>

      <div class="col-12 mt-3">
        <button class="btn btn-success me-2">Guardar</button>
        <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </div>
</template>
