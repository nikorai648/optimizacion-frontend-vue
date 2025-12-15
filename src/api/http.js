// src/api/http.js
import { API_URL, getAuthHeaders } from "./config";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
      ...getAuthHeaders(),
    },
  });

  // Si token inválido → forzar logout (simple)
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }

  // Parse seguro (por si viene vacío)
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw Object.assign(new Error("Request failed"), { status: res.status, data });
  }

  return data;
}
