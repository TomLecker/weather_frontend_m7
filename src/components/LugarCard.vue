<template>
  <v-card class="card h-100 text-center card--main shadow-sm">
    <v-card-text class="card-body">
      <h5 class="card-title">{{ lugar.nombre }}</h5>

      <img :src="iconUrl" :alt="lugar.estadoActual" />

      <p style="text-transform: capitalize">
        {{ lugar.estadoActual }}
      </p>

      <p class="fw-bold">
🌡️ {{ temperatura }}°{{ auth.userData?.preferenciaTemp || "C" }}
</p>

      <v-btn class="btn btn-primary" color="primary" @click="verDetalles">
        Ver detalle
      </v-btn>
      <v-spacer class="mt-1" />
      <v-btn
        class="btn btn-primary"
        v-if="auth.user"
        color="primary"
        :disabled="!auth.user || !auth.userData"
        @click="auth.addFavorito(lugar.nombre)"
      >
        ⭐ Guardar Favorito
      </v-btn>
      
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

const temperatura = computed(() => {

  if (!auth.userData || auth.userData.preferenciaTemp === "C") {
    return lugar.tempActual
  }

  return Math.round((lugar.tempActual * 9/5) + 32)

})

const { lugar } = defineProps({
  lugar: Object,
});

const router = useRouter();

const iconUrl = computed(
  () => `https://openweathermap.org/img/wn/${lugar.icono}@2x.png`,
);

function verDetalles() {
  router.push(`/lugar/${lugar.nombre}`);
}

function convertirTemp(tempC, unidad) {
  if (unidad === "F") {
    return (tempC * 9/5) + 32
  }
  return tempC
}

</script>
