<script setup>
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

function irACiudad(ciudad){
  router.push(`/lugar/${ciudad}`)
}
</script>

<template>

<v-card class=" ">

<v-card-title class="aside aside--mod">
⭐ Tus ciudades favoritas
</v-card-title>



<!-- Usuario no logueado -->

<div v-if="!auth.user">
Inicia sesión para guardar favoritos
</div>

<!-- Esperando datos de Firebase -->

<div v-else-if="!auth.userData">
Cargando favoritos...
</div>

<!-- No hay favoritos -->

<div v-else-if="auth.userData.favoritos.length === 0">
No tienes favoritos aún
</div>

<!-- Lista de favoritos -->

<v-list class="aside--mod" v-else>

<v-list-item
v-for="ciudad in auth.userData.favoritos"
:key="ciudad"
@click="irACiudad(ciudad)"
style="cursor:pointer"
>

<v-list-item-title>
{{ ciudad }}
</v-list-item-title>

</v-list-item>

</v-list>

</v-card>

</template>