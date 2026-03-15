<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const errorLocal = ref("")

const router = useRouter()
const auth = useAuthStore()

const register = async () => {

  errorLocal.value = ""

  if(password.value !== confirmPassword.value){
    errorLocal.value = "Las contraseñas no coinciden"
    return
  }

  const success = await auth.register(email.value, password.value)

  if(success){
    router.push("/dashboard")
  }

}

</script>

<template>

<v-container>

  <v-card max-width="400" class="mx-auto pa-4">

    <v-card-title>
      Crear cuenta
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

    <v-text-field
      label="Confirmar contraseña"
      type="password"
      v-model="confirmPassword"
    />

    <v-alert
      v-if="errorLocal || auth.error"
      type="error"
      class="mb-3"
    >
      {{ errorLocal || auth.error }}
    </v-alert>

    <v-btn
      color="primary"
      block
      :loading="auth.loading"
      @click="register"
    >
      Registrarse
    </v-btn>

  </v-card>

</v-container>

</template>