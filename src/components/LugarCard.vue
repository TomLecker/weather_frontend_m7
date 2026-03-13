<template>
  <v-card class="card h-100 text-center shadow-sm">
    <v-card-text class="card-body">

      <h5 class="card-title">{{ lugar.nombre }}</h5>

      <img :src="iconUrl" :alt="lugar.estadoActual" />

      <p style="text-transform: capitalize">
        {{ lugar.estadoActual }}
      </p>

      <p class="fw-bold">
        🌡️ {{ lugar.tempActual }}°C
      </p>

      <v-btn
        class="btn btn-primary"
        color="primary"
        @click="verDetalles"
      >
        Ver detalle
      </v-btn>

    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed } from "vue"

const { lugar } = defineProps({
  lugar: Object
})

const router = useRouter()

const iconUrl = computed(() =>
  `https://openweathermap.org/img/wn/${lugar.icono}@2x.png`
)

function verDetalles() {
  router.push(`/lugar/${lugar.nombre}`)
}
</script>