<template>

<v-container>

<v-card max-width="400" class="mx-auto pa-4">

<v-card-title>
Iniciar sesión
</v-card-title>

<v-text-field
label="Email"
v-model="email"
/>

<v-text-field
label="Contraseña"
type="password"
v-model="password"
/>

<v-alert
v-if="auth.error"
type="error"
class="mb-3"
>
{{ auth.error }}
</v-alert>

<v-btn
color="primary"
block
@click="login"
:loading="auth.loading"
>
Login
</v-btn>

</v-card>

</v-container>

</template>


<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const email = ref("")
const password = ref("")

const router = useRouter()
const auth = useAuthStore()

const login = async () => {

  const success = await auth.login(email.value, password.value)

  if(success){
    router.push("/dashboard")
  }

  const ok = await auth.login(email.value, password.value)

  if (ok) {
    router.push("/")   // redirección al home
  }

}

</script>