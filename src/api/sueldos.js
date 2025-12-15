import { API_URL, getAuthHeaders } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export async function getSueldos() {
  const res = await fetch(`${API_URL}/api/sueldos/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar sueldos"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function getSueldo(id) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar sueldo"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function createSueldo(data) {
  const res = await fetch(`${API_URL}/api/sueldos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al crear sueldo"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function updateSueldo(id, data) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al actualizar sueldo"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function deleteSueldo(id) {
  const res = await fetch(`${API_URL}/api/sueldos/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al eliminar sueldo"), { status: res.status, data: await parseJsonSafe(res) });

  return true;
}
