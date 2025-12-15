import { API_URL, getAuthHeaders } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export async function getAsistencias() {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar asistencias"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function getAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar asistencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function createAsistencia(data) {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al crear asistencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function updateAsistencia(id, data) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al actualizar asistencia"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function deleteAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al eliminar asistencia"), { status: res.status, data: await parseJsonSafe(res) });

  return true;
}
