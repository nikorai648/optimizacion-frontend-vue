<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/sueldo.webp" class="icono-listado" alt="Sueldos" />
        <h3 class="mb-0">Sueldos</h3>
      </div>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading">Cargando sueldos...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>Mes</th>
          <th>Trabajos</th>
          <th>Total</th>
          <th class="text-end"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in sueldos" :key="s.id">
          <td>{{ s.trabajador_rut }}</td>
          <td>{{ s.trabajador_nombre }}</td>
          <td>{{ s.mes }}</td>
          <td>{{ s.cantidad_trabajos_mes }}</td>
          <td>${{ s.sueldo_total_mes }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(s.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(s.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="sueldos.length === 0">
          <td colspan="6">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
