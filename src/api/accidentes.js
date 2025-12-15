// src/api/accidentes.js
import { API_URL, getAuthHeaders } from "./config";

// helper: parse seguro
async function parseJsonSafe(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

// LISTAR
export async function getAccidentes() {
  const res = await fetch(`${API_URL}/api/accidentes/`, {
    headers: {
      Accept: "application/json",
      ...getAuthHeaders(),
    },
  });

  if (res.status === 401) {
    throw Object.assign(new Error("Unauthorized"), {
      status: 401,
      data: await parseJsonSafe(res),
    });
  }

  if (!res.ok) {
    throw Object.assign(new Error("Error al cargar accidentes"), {
      status: res.status,
      data: await parseJsonSafe(res),
    });
  }

  return parseJsonSafe(res);
}

// OBTENER UNO
export async function getAccidente(id) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    headers: {
      Accept: "application/json",
      ...getAuthHeaders(),
    },
  });

  if (res.status === 401) {
    throw Object.assign(new Error("Unauthorized"), {
      status: 401,
      data: await parseJsonSafe(res),
    });
  }

  if (!res.ok) {
    throw Object.assign(new Error("Error al cargar accidente"), {
      status: res.status,
      data: await parseJsonSafe(res),
    });
  }

  return parseJsonSafe(res);
}

// CREAR
export async function createAccidente(data) {
  const res = await fetch(`${API_URL}/api/accidentes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    throw Object.assign(new Error("Unauthorized"), {
      status: 401,
      data: await parseJsonSafe(res),
    });
  }

  if (!res.ok) {
    const err = await parseJsonSafe(res);
    console.error("Error creación accidente:", err);
    throw Object.assign(new Error("Error al crear accidente"), {
      status: res.status,
      data: err,
    });
  }

  return parseJsonSafe(res);
}

// ACTUALIZAR
export async function updateAccidente(id, data) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    throw Object.assign(new Error("Unauthorized"), {
      status: 401,
      data: await parseJsonSafe(res),
    });
  }

  if (!res.ok) {
    const err = await parseJsonSafe(res);
    console.error("Error actualización accidente:", err);
    throw Object.assign(new Error("Error al actualizar accidente"), {
      status: res.status,
      data: err,
    });
  }

  return parseJsonSafe(res);
}

// ELIMINAR
export async function deleteAccidente(id) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...getAuthHeaders(),
    },
  });

  if (res.status === 401) {
    throw Object.assign(new Error("Unauthorized"), {
      status: 401,
      data: await parseJsonSafe(res),
    });
  }

  if (!res.ok) {
    throw Object.assign(new Error("Error al eliminar accidente"), {
      status: res.status,
      data: await parseJsonSafe(res),
    });
  }

  return true;
}
