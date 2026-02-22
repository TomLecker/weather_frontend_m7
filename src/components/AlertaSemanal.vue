<template>
  <div v-if="alerta" class="alert alert-warning text-center mt-3">
    {{ alerta.mensaje }}
  </div>
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