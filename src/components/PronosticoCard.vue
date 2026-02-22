<template>
  <div class="col-12 col-sm-6 col-lg-4 mb-3">
    <div class="card card--main text-center h-100">
      <div class="card__body">
        <h5 class="card__title">{{ data.dia }}</h5>

        <img :src="iconUrl" :alt="data.estado" />

        <p class="fw-bold mt-2">
          🌡️ {{ data.tempActual }}°C
        </p>

        <p style="text-transform: capitalize">
          {{ data.estado }}
        </p>

        <p>
          Min {{ data.min }}°C / Max {{ data.max }}°C
        </p>

        <p>💧 {{ data.humedad }}%</p>
        <p>💨 {{ data.viento }} m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PronosticoCard",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    iconUrl() {
      return `https://openweathermap.org/img/wn/${this.data.icono}@2x.png`;
    }
  }
};
</script>