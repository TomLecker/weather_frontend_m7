<template>
  <v-alert
    v-if="alerta"
    type="warning"
    class="alert text-center mt-3"
    variant="tonal"
  >
    {{ alerta.mensaje }}
  </v-alert>
</template>

<script>
export default {
  name: "AlertaSemanal",
  props: {
    alerta: {
      type: Object,
      default: null
    }
  }
};
</script>