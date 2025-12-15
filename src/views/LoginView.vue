<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h3 class="text-center mb-4">Ingreso (API Django)</h3>

        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              autocomplete="username"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              autocomplete="current-password"
              required
            />
          </div>

          <button class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? "Ingresando..." : "Entrar" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi } from "../api/auth";
import { useAuth } from "../auth";

export default {
  name: "LoginView",
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);

    const router = useRouter();
    const auth = useAuth();

    const handleSubmit = async () => {
      error.value = "";
      loading.value = true;

      try {
        const data = await loginApi(username.value, password.value);

        // Guardar sesión
        auth.login(username.value, data.token);

        // Redirigir
        router.push("/");
      } catch (e) {
        // Si tu loginApi tira status, esto quedará perfecto:
        if (e?.status === 400 || e?.status === 401) {
          error.value = "Credenciales inválidas.";
        } else {
          error.value = "Servidor no disponible o error de red.";
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      error,
      loading,
      handleSubmit,
    };
  },
};
</script>
