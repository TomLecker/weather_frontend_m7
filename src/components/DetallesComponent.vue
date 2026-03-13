<template>
  <div>

    <!-- ERROR -->
    <v-alert
      v-if="error"
      type="error"
      class="alert alert-danger mt-3"
      variant="tonal"
    >
      {{ error }}
    </v-alert>

    <!-- SKELETON LOADER -->
    <v-row v-if="loading" class="row">
      <v-col
        v-for="n in 5"
        :key="n"
        cols="12"
        sm="6"
        lg="4"
        class="mb-3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <!-- PRONÓSTICO REAL -->
    <v-row v-if="!loading" class="row">
      <PronosticoCard
        v-for="p in pronostico"
        :key="p.fecha"
        :data="p"
      />
    </v-row>

    <!-- ALERTA -->
    <AlertaSemanal :alerta="alerta" />

    <!-- RESUMEN -->
    <ResumenSemanal :pronostico="pronostico" />

  </div>
</template>

<script>
import PronosticoCard from "../components/PronosticoCard.vue";
import AlertaSemanal from "../components/AlertaSemanal.vue";
import ResumenSemanal from "../components/ResumenSemanal.vue";

export default {
  props: {
    pronostico: Array,
    alerta: Object,
    loading: Boolean,
    error: String
  },
  components: {
    PronosticoCard,
    AlertaSemanal,
    ResumenSemanal
  }
};
</script>