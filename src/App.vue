<template>
  <NavbarComponent />

  <MainLayout>
    <router-view />
  </MainLayout>

  <FooterComponent />
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import MainLayout from "@/layout/MainLayout.vue";

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    MainLayout
  }
};
</script>