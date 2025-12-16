<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/accidente.webp" class="icono-listado" alt="Accidentes" />
        <h3 class="mb-0">Accidentes</h3>
      </div>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading" class="alert alert-info">Cargando accidentes...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Gravedad</th>
          <th>Lugar</th>
          <th>Licencia</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in accidentes" :key="a.id">
          <td>{{ a.fecha }}</td>
          <td>{{ a.tipo }}</td>
          <td>{{ a.gravedad }}</td>
          <td>{{ a.lugar }}</td>
          <td>{{ a.requiere_licencia ? "Sí" : "No" }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(a.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(a.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="accidentes.length === 0">
          <td colspan="6">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
