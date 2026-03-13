<template>
  <v-container class="container">
    <v-row>
      <v-col
        v-for="lugar in weatherStore.lugares"
        :key="lugar.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <LugarCard :lugar="lugar" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue"
import { useWeatherStore } from "../stores/weatherStore"
import LugarCard from "../components/LugarCard.vue"

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.cargarClimaCiudades()
})
</script>