<!-- src/views/AccidenteFormView.vue -->
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAccidente, createAccidente, updateAccidente } from "../api/accidentes";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEditar = computed(() => !!id);

const form = ref({
  fecha: "",
  tipo: "",
  gravedad: "LEVE",
  lugar: "",
  hora_suceso: null,
  descripcion: "",
  requiere_licencia: false,
  dias_licencia: 0,
  costo_estimado: null,
  reportado_a: "",
  observaciones: "",
  trabajadores_involucrados: "", // si tu API lo maneja como string
});

const error = ref("");
const loading = ref(false);

function handle401() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
}

onMounted(async () => {
  if (!esEditar.value) return;

  loading.value = true;
  error.value = "";

  try {
    const data = await getAccidente(id);

    form.value = {
      fecha: data.fecha || "",
      tipo: data.tipo || "",
      gravedad: data.gravedad || "LEVE",
      lugar: data.lugar || "",
      hora_suceso: data.hora_suceso ?? null,
      descripcion: data.descripcion || "",
      requiere_licencia: !!data.requiere_licencia,
      dias_licencia: data.dias_licencia ?? 0,
      costo_estimado: data.costo_estimado ?? null,
      reportado_a: data.reportado_a || "",
      observaciones: data.observaciones || "",
      trabajadores_involucrados: data.trabajadores_involucrados ?? "",
    };
  } catch (e) {
    console.error(e);

    if (e?.status === 401) {
      handle401();
      return;
    }

    error.value = "No se pudo cargar el accidente";
  } finally {
    loading.value = false;
  }
});

const validar = () => {
  if (!form.value.fecha) return "La fecha es obligatoria.";
  if (!form.value.tipo) return "El tipo de accidente es obligatorio.";
  if (!form.value.gravedad) return "La gravedad es obligatoria.";
  return "";
};

const guardar = async (e) => {
  e.preventDefault();
  error.value = "";

  const msg = validar();
  if (msg) {
    error.value = msg;
    return;
  }

  loading.value = true;

  try {
    const payload = {
      ...form.value,
      dias_licencia: Number(form.value.dias_licencia) || 0,
      costo_estimado:
        form.value.costo_estimado === "" || form.value.costo_estimado === null
          ? null
          : Number(form.value.costo_estimado),
    };

    if (esEditar.value) {
      await updateAccidente(id, payload);
    } else {
      await createAccidente(payload);
    }

    router.push("/accidentes");
  } catch (e) {
    console.error(e);

    if (e?.status === 401) {
      handle401();
      return;
    }

    // si tu api devuelve {detail: ...} o errores por campo
    error.value = e?.message || "Error al guardar el accidente.";
  } finally {
    loading.value = false;
  }
};

const cancelar = () => router.push("/accidentes");
</script>

<template>
  <div class="container mt-4 col-md-7">
    <h3 class="mb-3">
      {{ esEditar ? "Editar Accidente" : "Nuevo Accidente" }}
    </h3>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="alert alert-info">Cargando...</div>

    <form class="row g-3" @submit="guardar">
      <div class="col-md-4">
        <label class="form-label">Fecha *</label>
        <input type="date" v-model="form.fecha" class="form-control" required />
      </div>

      <div class="col-md-4">
        <label class="form-label">Tipo *</label>
        <input v-model="form.tipo" class="form-control" placeholder="Corte, caída..." required />
      </div>

      <div class="col-md-4">
        <label class="form-label">Gravedad *</label>
        <select v-model="form.gravedad" class="form-select" required>
          <option value="LEVE">Leve</option>
          <option value="MODERADA">Moderada</option>
          <option value="GRAVE">Grave</option>
          <option value="FATAL">Fatal</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Lugar</label>
        <input v-model="form.lugar" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Hora suceso (opcional)</label>
        <input v-model="form.hora_suceso" class="form-control" placeholder="15:30:00" />
      </div>

      <div class="col-12">
        <label class="form-label">Descripción</label>
        <textarea v-model="form.descripcion" class="form-control" rows="2"></textarea>
      </div>

      <div class="col-md-6">
        <label class="form-label">Requiere licencia</label>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="requiereLicencia" v-model="form.requiere_licencia" />
          <label class="form-check-label" for="requiereLicencia">Sí, requiere licencia</label>
        </div>
      </div>

      <div class="col-md-6" v-if="form.requiere_licencia">
        <label class="form-label">Días de licencia</label>
        <input type="number" min="0" v-model="form.dias_licencia" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Costo estimado</label>
        <input type="number" step="0.01" v-model="form.costo_estimado" class="form-control" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Reportado a</label>
        <input v-model="form.reportado_a" class="form-control" />
      </div>

      <div class="col-12">
        <label class="form-label">Observaciones</label>
        <textarea v-model="form.observaciones" class="form-control" rows="2"></textarea>
      </div>

      <div class="col-12">
        <label class="form-label">Trabajadores involucrados</label>
        <input v-model="form.trabajadores_involucrados" class="form-control" />
      </div>

      <div class="col-12 mt-3">
        <button class="btn btn-success me-2" type="submit" :disabled="loading">
          {{ loading ? "Guardando..." : "Guardar" }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancelar" :disabled="loading">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>
