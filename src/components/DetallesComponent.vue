<template>
  <div>
    <div v-if="loading" class="text-center mt-4">
      Cargando...
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="row">
      <PronosticoCard
        v-for="p in pronostico"
        :key="p.dia"
        :data="p"
      />
    </div>

    <AlertaSemanal :alerta="alerta" />
    <ResumenSemanal :pronostico="pronostico" />
  </div>
</template>

<script>
import PronosticoCard from "@/components/PronosticoCard.vue";
import AlertaSemanal from "@/components/AlertaSemanal.vue";
import ResumenSemanal from "@/components/ResumenSemanal.vue";

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

