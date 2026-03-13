<template>

  <v-footer
    class="footer bg-body-tertiary mt-auto"
    elevation="2"
  >

    <v-container class="container-fluid">

      <v-row
        class="footer__fila"
        style="background-color: rgba(0,0,0,0.05)"
      >

        <v-col class="footer__text">
          © 2025 Copyright
        </v-col>

        <v-col class="footer__text">
          <b>Autor:</b> Francisco Lopez Garay
        </v-col>

        <v-col class="footer__text">
          <b>Año:</b> 2025
        </v-col>

        <v-col class="footer__text">
          <b>Descripción:</b>
          Aplicación para mostrar el clima semanal de una ciudad seleccionada
        </v-col>

        <v-col class="footer__text">
          <b>Componentes:</b>
          <a
            class="text-body"
            href="https://getbootstrap.com"
            target="_blank"
          >
            Getbootstrap.com
          </a>
        </v-col>

        <v-col class="footer__text">
          <b>Colores:</b>
          <a
            href="https://cssgradient.io"
            target="_blank"
          >
            Cssgradient.com
          </a>
        </v-col>

        <v-col class="footer__text">
          <b>API:</b>
          <a
            href="https://openweathermap.org"
            target="_blank"
          >
            Openweathermap.org
          </a>
        </v-col>

      </v-row>

    </v-container>

  </v-footer>

</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style lang="scss" scoped>
</style>