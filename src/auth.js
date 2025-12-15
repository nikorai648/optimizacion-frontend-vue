// src/auth.js
import { reactive } from "vue";

const state = reactive({
  isAuthenticated: !!localStorage.getItem("token"),
  username: localStorage.getItem("username") || null,
  token: localStorage.getItem("token") || null,
});

function login(username, token) {
  state.isAuthenticated = true;
  state.username = username;
  state.token = token;
  localStorage.setItem("username", username);
  localStorage.setItem("token", token);
}

function logout() {
  state.isAuthenticated = false;
  state.username = null;
  state.token = null;
  localStorage.removeItem("username");
  localStorage.removeItem("token");
}

export function useAuth() {
  return { state, login, logout };
}
