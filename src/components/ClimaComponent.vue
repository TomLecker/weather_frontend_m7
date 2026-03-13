<template>
  <section>

    <h3 class="mb-4">Climas de hoy</h3>

    <!-- 🔎 BÚSQUEDA -->
    <v-text-field
      v-model="busqueda"
      label="Buscar ciudad..."
      variant="outlined"
      density="comfortable"
      class="mb-4 form-control"
      clearable
    />

    <!-- Skeleton mientras carga -->
    <v-row v-if="loading" class="row g-4">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <!-- Mensaje si no encuentra -->
    <p v-if="!lugaresFiltrados.length && !loading">
      No se encontró ninguna ciudad.
    </p>

    <!-- LISTADO -->
    <v-row v-if="!loading" class="row g-4">

      <v-col
        v-for="lugar in lugaresFiltrados"
        :key="lugar.id"
        cols="12"
        md="6"
        lg="4"
        xl="3"
        class="card card--main"
      >
        <LugarCard :lugar="lugar" />
      </v-col>

    </v-row>

  </section>
</template>