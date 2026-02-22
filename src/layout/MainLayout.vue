<template>
  <div class="container-fluid mt-4">
    <div class="row">

      <!-- MAIN DINÁMICO -->
      <div class="col-12 col-md-9">
        <main>
          <slot />
        </main>
      </div>

      <!-- ASIDE GLOBAL -->
      <div class="col-12 col-md-3">
        <AsideGlobal />
      </div>

    </div>
  </div>
</template>

<script>
import AsideGlobal from "@/components/AsideGlobal.vue";

export default {
  components: {
    AsideGlobal
  }
};
</script>