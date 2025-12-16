// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/estilos.css";

createApp(App).use(router).mount("#app");
