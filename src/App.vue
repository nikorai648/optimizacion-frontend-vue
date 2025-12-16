<!-- src/App.vue -->
<template>
  <Navbar />
  <RouterView />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
</script>
