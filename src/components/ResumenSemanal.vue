<template>
  <div v-if="pronostico.length" class="mt-4">
    <h4>Resumen Semanal</h4>
    <ul class="list-unstyled">
      <li>🌡️ Máxima semanal: {{ mayor }}°C</li>
      <li>❄️ Mínima semanal: {{ menor }}°C</li>
      <li>📊 Promedio semanal: {{ promedio }}°C</li>
      <li>☁️ Estado predominante: {{ estado }}</li>
    </ul>
  </div>
</template>

<script>
import {
  mayorTemperatura,
  menorTemperatura,
  promedioTemperaturas,
  estadoSemanal
} from "../Utils/pronostico";

export default {
  name: "ResumenSemanal",
  props: {
    pronostico: {
      type: Array,
      required: true
    }
  },
  computed: {
    mayor() {
      return mayorTemperatura(this.pronostico);
    },
    menor() {
      return menorTemperatura(this.pronostico);
    },
    promedio() {
      return promedioTemperaturas(this.pronostico);
    },
    estado() {
      return estadoSemanal(this.pronostico);
    }
  }
};
</script>