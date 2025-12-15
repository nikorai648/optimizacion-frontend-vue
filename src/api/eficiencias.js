import { API_URL, getAuthHeaders } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export async function getEficiencias() {
  const res = await fetch(`${API_URL}/api/eficiencias/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar eficiencias"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function getEficiencia(id) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar eficiencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function createEficiencia(data) {
  const res = await fetch(`${API_URL}/api/eficiencias/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al crear eficiencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function updateEficiencia(id, data) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al actualizar eficiencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function deleteEficiencia(id) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al eliminar eficiencia"), { status: res.status, data: await parseJsonSafe(res) });

  return true;
}
