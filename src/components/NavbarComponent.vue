<template>
  <header class="weather__header">
    <v-app-bar app color="white" elevation="2" class="navbar">
      <v-toolbar-title class="d-flex align-center">
        <router-link class="navbar-brand  me-4" to="/"> WeatherApp </router-link>

        <v-btn class="weather-nav__btn" variant="text" to="/" router> Inicio </v-btn>

        <v-btn class="weather-nav__btn" v-if="!auth.user" variant="text" to="/login" router> Login </v-btn>

        <v-btn class="weather-nav__btn" v-if="!auth.user" variant="text" to="/register" router> Registro </v-btn>

        <v-btn class="weather-nav__btn" v-if="auth.user" variant="text" to="/dashboard" router> Dashboard </v-btn>

        <v-btn class="weather-nav__btn" variant="text" to="/acerca" router> Acerca de </v-btn>

        

        <span v-if="auth.user" class="weather-nav__text" >
          {{ auth.user.email }}
        </span>

        <v-btn v-if="auth.user" class="weather-nav__btn" @click="auth.logout()"> Logout </v-btn>
      </v-toolbar-title>
    </v-app-bar>
  </header>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

</script>
