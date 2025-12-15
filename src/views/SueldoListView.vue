<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getSueldos, deleteSueldo } from "../api/sueldos";

const router = useRouter();
const sueldos = ref([]);
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
    sueldos.value = await getSueldos();
  } catch (e) {
    if (e?.status === 401) return handle401();
    error.value = e?.message || "Error al cargar sueldos";
  } finally {
    loading.value = false;
  }
};

const irNuevo = () => router.push("/sueldos/nuevo");
const irEditar = (id) => router.push(`/sueldos/${id}`);

const eliminar = async (id) => {
  if (!confirm("¿Eliminar sueldo?")) return;
  try {
    await deleteSueldo(id);
    sueldos.value = sueldos.value.filter((s) => s.id !== id);
  } catch (e) {
    if (e?.status === 401) return handle401();
    alert(e?.message || "No se pudo eliminar el sueldo");
  }
};

onMounted(cargar);
</script>
