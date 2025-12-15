// src/api/auth.js
import { API_URL } from "./config";

export async function loginApi(username, password) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  // DRF Token Auth devuelve { token: "..." }
  return res.json();
}
