<template>
  <header class="weather__header">

    <v-app-bar
      color="white"
      elevation="2"
      class="navbar"
    >

      <v-toolbar-title class="d-flex align-center">

        <router-link class="navbar-brand me-4" to="/">
          WeatherApp
        </router-link>

        <v-btn variant="text" to="/" router>
          Inicio
        </v-btn>

        <v-btn variant="text" to="/acerca" router>
          Acerca de
        </v-btn>

      </v-toolbar-title>

    </v-app-bar>

  </header>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>
