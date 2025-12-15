<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h3 class="text-center mb-4">Ingreso (API Django)</h3>

        <!-- Mensaje de error -->
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

          <button
            class="btn btn-primary w-100"
            :disabled="loading"
          >
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
import { loginApi } from "@/api/auth";
import { useAuth } from "@/auth";

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
        // 1️⃣ Login contra Django REST
        const data = await loginApi(username.value, password.value);

        // 2️⃣ Guardar sesión (token + usuario)
        auth.login(username.value, data.token);

        // 3️⃣ Redirección
        router.push("/");
      } catch (e) {
        error.value = "Credenciales inválidas o servidor no disponible.";
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
