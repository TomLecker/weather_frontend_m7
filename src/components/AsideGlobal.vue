<template>
  <v-card class="aside aside--mod shadow-sm p-3 rounded">

<img
  class="img-fluid aside__image rounded mb-3"
  :src="imagen"
  alt="Ciudad"
/>

    <v-card-text>

      <h5 class="aside__title">Información relacionada</h5>

      <p class="aside__text">
        Esta aplicación obtiene datos desde OpenWeatherMap
        y muestra información actual y semanal.
      </p>

    </v-card-text>

  </v-card>
</template>

<script>
import imagen from "../assets/santiago.jpg"

export default {
  name: "AsideGlobal",
  data() {
    return {
      imagen
    }
  }
}

</script>