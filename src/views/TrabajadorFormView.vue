<template>
  <div class="container mt-4 col-md-6">
    <h3>{{ esEditar ? "Editar Trabajador" : "Nuevo Trabajador" }}</h3>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <form class="row g-3" @submit.prevent="handleSubmit">
      <div class="col-12">
        <label class="form-label">RUT</label>
        <input v-model="form.rut" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input v-model="form.nombre" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Apellido</label>
        <input v-model="form.apellido" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Turno</label>
        <select v-model="form.turno" class="form-select">
          <option value="DIURNO">Diurno</option>
          <option value="NOCTURNO">Nocturno</option>
          <option value="ROTATIVO">Rotativo</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Tipo</label>
        <input v-model="form.tipo" class="form-control" placeholder="Operario - INDEFINIDO" />
      </div>

      <div class="col-12 mt-3">
        <button class="btn btn-success me-2">Guardar</button>
        <button type="button" class="btn btn-secondary" @click="goBack">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createTrabajador, getTrabajador, updateTrabajador } from "../api/trabajadores";

const initialForm = { rut: "", nombre: "", apellido: "", turno: "DIURNO", tipo: "" };

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const form = ref({ ...initialForm });
    const error = ref("");
    const esEditar = computed(() => !!route.params.id);

    const handle401 = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      router.push("/login");
    };

    onMounted(async () => {
      if (!esEditar.value) return;
      try {
        const data = await getTrabajador(route.params.id);
        form.value = {
          rut: data.rut ?? "",
          nombre: data.nombre ?? "",
          apellido: data.apellido ?? "",
          turno: data.turno ?? "DIURNO",
          tipo: data.tipo ?? "",
        };
      } catch (e) {
        if (e?.status === 401) return handle401();
        error.value = e?.message || "No se pudo cargar el trabajador";
      }
    });

    const validar = () => {
      if (!form.value.rut || !form.value.nombre || !form.value.apellido) return "RUT, nombre y apellido son obligatorios.";
      if (form.value.rut.length < 8) return "RUT demasiado corto.";
      return "";
    };

    const handleSubmit = async () => {
      error.value = "";
      const msg = validar();
      if (msg) return (error.value = msg);

      try {
        if (esEditar.value) await updateTrabajador(route.params.id, form.value);
        else await createTrabajador(form.value);
        router.push("/trabajadores");
      } catch (e) {
        if (e?.status === 401) return handle401();
        error.value = e?.message || "Error guardando trabajador";
      }
    };

    const goBack = () => router.push("/trabajadores");

    return { form, error, esEditar, handleSubmit, goBack };
  },
};
</script>
