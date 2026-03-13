<template>

  <v-col cols="12" sm="6" lg="4" class="mb-3">

    <v-card
      class="card card--main text-center h-100 pa-4"
      elevation="3"
    >

      <!-- DIA -->
      <h5 class="card__title mb-2">
        {{ data.dia }}
      </h5>

      <!-- ICONO CLIMA -->
      <v-img
        :src="iconUrl"
        :alt="data.estado"
        width="90"
        class="mx-auto"
      />

      <!-- TEMPERATURA PRINCIPAL -->
      <div class="text-h4 font-weight-bold mt-2">
        <v-icon size="24" class="me-1">mdi-thermometer</v-icon>
        {{ data.tempActual }}°C
      </div>

      <!-- ESTADO -->
      <p class="mt-1 text-capitalize">
        {{ data.estado }}
      </p>

      <!-- MIN MAX -->
      <p class="d-flex justify-center align-center ga-2">
        <v-icon size="18">mdi-arrow-down</v-icon>
        {{ data.min }}°C
        /
        <v-icon size="18">mdi-arrow-up</v-icon>
        {{ data.max }}°C
      </p>

      <!-- HUMEDAD Y VIENTO -->
      <v-row justify="center" class="mt-2">

        <v-col cols="6" class="d-flex justify-center align-center ga-1">
          <v-icon size="18">mdi-water-percent</v-icon>
          {{ data.humedad }}%
        </v-col>

        <v-col cols="6" class="d-flex justify-center align-center ga-1">
          <v-icon size="18">mdi-weather-windy</v-icon>
          {{ data.viento }} m/s
        </v-col>

      </v-row>

    </v-card>

  </v-col>

</template>

<script>
export default {
  props: {
    data: Object
  },

  computed: {
    iconUrl() {
      return `https://openweathermap.org/img/wn/${this.data.icono}@2x.png`
    }
  }
}
</script>