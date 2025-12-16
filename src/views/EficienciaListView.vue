<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex align-items-center gap-2">
        <img src="/img/eficiencia.jpg" class="icono-listado" alt="Eficiencia" />
        <h3 class="mb-0">Eficiencia de Trabajadores</h3>
      </div>
      <button class="btn btn-primary" @click="irNuevo">Nuevo</button>
    </div>

    <div v-if="loading">Cargando eficiencias...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-else class="table table-sm table-striped">
      <thead>
        <tr>
          <th>RUT</th>
          <th>Nombre</th>
          <th>ID</th>
          <th>Trabajos</th>
          <th>Sueldo Prom.</th>
          <th class="text-end"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in eficiencias" :key="e.id">
          <td>{{ e.trabajador_rut }}</td>
          <td>{{ e.trabajador_nombre }}</td>
          <td>{{ e.id_eficiencia }}</td>
          <td>{{ e.trabajos_completados_en_1_mes }}</td>
          <td>{{ e.sueldo_promedio_informado }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-secondary me-2" @click="irEditar(e.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(e.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="eficiencias.length === 0">
          <td colspan="6">Sin registros</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
