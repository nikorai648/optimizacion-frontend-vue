import { API_URL, getAuthHeaders } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export async function getDesempenos() {
  const res = await fetch(`${API_URL}/api/desempenos/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar desempeños"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function getDesempeno(id) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar desempeño"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function createDesempeno(data) {
  const res = await fetch(`${API_URL}/api/desempenos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al crear desempeño"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function updateDesempeno(id, data) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al actualizar desempeño"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function deleteDesempeno(id) {
  const res = await fetch(`${API_URL}/api/desempenos/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al eliminar desempeño"), { status: res.status, data: await parseJsonSafe(res) });

  return true;
}
