// src/api/auth.js
import { API_URL } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function loginApi(username, password) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    // Aquí te queda el error real del backend disponible en e.data
    throw Object.assign(new Error("Credenciales inválidas"), {
      status: res.status,
      data,
    });
  }

  // Debe venir { token: "..." }
  return data;
}
