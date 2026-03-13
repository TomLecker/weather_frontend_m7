<template>

  <v-app>

    <NavbarComponent />

    <v-main>
      <MainLayout>
        <router-view />
      </MainLayout>
    </v-main>

    <FooterComponent />

  </v-app>

</template>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import MainLayout from "./layout/MainLayout.vue";

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    MainLayout,
  },
};
</script>
