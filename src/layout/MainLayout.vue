<template>

  <v-container fluid class="mt-4">

    <v-row>

      <!-- CONTENIDO PRINCIPAL -->
      <v-col
        cols="12"
        md="9"
        
      >
        <main>
          <slot />
        </main>
      </v-col>

      <!-- ASIDE -->
      <v-col
        cols="12"
        md="3"
        class="d-flex justify-center align-center"
      
>
      >
        <AsideGlobal />
      </v-col>

    </v-row>

  </v-container>

</template>

<script>
import AsideGlobal from "../components/AsideGlobal.vue"

export default {
  components: {
    AsideGlobal
  }
}
</script>