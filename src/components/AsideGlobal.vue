<template>
  <aside class="aside aside--mod shadow-sm p-3 rounded">
    <img
      class="img-fluid aside__image rounded mb-3"
      src="@/assets/santiago.jpg"
      alt="Ciudad"
    />

    <h5 class="aside__title">Información relacionada</h5>

    <p class="aside__text">
      Esta aplicación obtiene datos desde OpenWeatherMap
      y muestra información actual y semanal.
    </p>
  </aside>
</template>

<script>
export default {
  name: "AsideGlobal"
};
</script>