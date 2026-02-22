<template>
  <section>

    <h3 class="mb-4">Climas de hoy</h3>

    <!-- 🔎 BÚSQUEDA -->
    <input
      type="text"
      v-model="busqueda"
      placeholder="Buscar ciudad..."
      class="form-control mb-4"
    />

    <!-- Mensaje si no encuentra -->
    <p v-if="!lugaresFiltrados.length && !loading">
      No se encontró ninguna ciudad.
    </p>

    <div v-if="loading" class="text-center">
      Cargando climas...
    </div>

    <!-- LISTADO -->
    <div class=" row g-4">
      <div
        v-for="lugar in lugaresFiltrados"
        :key="lugar.id"
        class="card card--main col-12 col-md-6 col-lg-4 col-xl-3"
      >
        <LugarCard :lugar="lugar" />
      </div>
    </div>

  </section>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useClimaActual } from "@/Composables/useClimaActual";
import LugarCard from "./LugarCard.vue";

export default {
  components: { LugarCard },

  setup() {
    const { lugares, loading, cargarClima } = useClimaActual();

    const busqueda = ref("");

    const lugaresFiltrados = computed(() =>
      lugares.value.filter(lugar =>
        lugar.nombre
          .toLowerCase()
          .includes(busqueda.value.toLowerCase())
      )
    );

    onMounted(() => {
      cargarClima();
    });

    return {
      busqueda,
      lugaresFiltrados,
      loading
    };
  }
};
</script>