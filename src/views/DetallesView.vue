<template>
  <v-container class="container mt-4">
    <h3>Pronóstico para {{ ciudad }}</h3>
    <DetallesComponent
      :pronostico="weatherStore.pronostico"
      :alerta="weatherStore.alerta"
      :loading="weatherStore.loading"
      :error="weatherStore.error"
    />
  </v-container>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useWeatherStore } from "../stores/weatherStore"
import DetallesComponent from "../components/DetallesComponent.vue"

const route = useRoute()
const weatherStore = useWeatherStore()

const ciudad = route.params.ciudad

onMounted(() => {
  weatherStore.cargarDetalles(ciudad)
})
</script>