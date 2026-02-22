<template>
  <div class="container mt-4">
    <h3>Pronóstico para {{ ciudad }}</h3>

    <DetallesComponent
      :pronostico="pronostico"
      :alerta="alerta"
      :loading="loading"
      :error="error"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePronostico } from "@/Composables/usePronostico";
import DetallesComponent from "@/components/DetallesComponent.vue";

export default {
  components: { DetallesComponent },
  setup() {
    const route = useRoute();
    const ciudad = route.params.ciudad || "Santiago";

    const {
      pronostico,
      alerta,
      loading,
      error,
      cargarPronostico
    } = usePronostico();

    onMounted(() => {
      cargarPronostico(ciudad);
    });

    return {
      ciudad,
      pronostico,
      alerta,
      loading,
      error
    };
  }
};
</script>