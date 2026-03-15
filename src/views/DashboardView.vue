<template>

<v-container>

<h2 class="dashboard__title">
Bienvenido {{ auth.user?.email }}
</h2>

<h3 class="dashboard__subtitle">Ciudades favoritas</h3>

<p v-if="favoritos.length === 0">
No tienes ciudades favoritas aún.
</p>

<v-row>

<v-col
  v-for="lugar in favoritos"
  :key="lugar.nombre"
  cols="12"
  md="4"
>

<LugarCard :lugar="lugar"/>

</v-col>

</v-row>

<h3 class="mt-6 dashboard__subtitle">Preferencia de temperatura:</h3>

<v-select 
  class="dashboard__selector"  
  label="Unidad de temperatura"
  :items="['C','F']"
  v-model="auth.userData.preferenciaTemp"
  @update:modelValue="auth.cambiarPreferenciaTemp"
/>

</v-container>

</template>

<script setup>

import { computed, onMounted } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useWeatherStore } from "../stores/weatherStore"
import LugarCard from "../components/LugarCard.vue"

const auth = useAuthStore()
const weather = useWeatherStore()

onMounted(() => {

 if(weather.lugares.length === 0){
   weather.cargarClimaCiudades()
 }

})

const favoritos = computed(() => {

  if (!auth.userData?.favoritos) return []

  return weather.lugares.filter(lugar =>
    auth.userData.favoritos.includes(lugar.nombre)
  )

})



</script>