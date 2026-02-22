<template>
  <div class="card h-100 text-center shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ lugar.nombre }}</h5>

      <img :src="iconUrl" :alt="lugar.estadoActual" />

      <p style="text-transform: capitalize">
        {{ lugar.estadoActual }}
      </p>

      <p class="fw-bold">
        🌡️ {{ lugar.tempActual }}°C
      </p>

      <button
        class="btn btn-primary"
        @click="verDetalles"
      >
        Ver detalle
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  props: {
    lugar: Object
  },

  setup(props) {
    const router = useRouter();

    const iconUrl = computed(() =>
      `https://openweathermap.org/img/wn/${props.lugar.icono}@2x.png`
    );

    function verDetalles() {
      router.push(`/lugar/${props.lugar.nombre}`);
    }

    return {
      iconUrl,
      verDetalles
    };
  }
};
</script>