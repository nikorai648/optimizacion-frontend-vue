import { API_URL, getAuthHeaders } from "./config";

async function parseJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

export async function getTrabajadores() {
  const res = await fetch(`${API_URL}/api/trabajadores/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar trabajadores"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function getTrabajador(id) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al cargar trabajador"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function createTrabajador(data) {
  const res = await fetch(`${API_URL}/api/trabajadores/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al crear trabajador"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function updateTrabajador(id, data) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al actualizar trabajador"), { status: res.status, data: await parseJsonSafe(res) });

  return parseJsonSafe(res);
}

export async function deleteTrabajador(id) {
  const res = await fetch(`${API_URL}/api/trabajadores/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", ...getAuthHeaders() },
  });

  if (res.status === 401) throw Object.assign(new Error("Unauthorized"), { status: 401, data: await parseJsonSafe(res) });
  if (!res.ok) throw Object.assign(new Error("Error al eliminar trabajador"), { status: res.status, data: await parseJsonSafe(res) });

  return true;
}
