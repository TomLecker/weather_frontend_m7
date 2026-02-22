import { ref } from "vue";
import { obtenerClimaActual } from "@/services/WeatherConexion";

export function useClimaActual() {
  const lugares = ref([]);
  const loading = ref(false);

  const listaCiudades = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Bilbao",
    "Santiago",
    "Lima",
    "Moscu",
    "Caracas",
    "Bogota"
  ];

  async function cargarClima() {
    loading.value = true;
    lugares.value = [];

    for (let i = 0; i < listaCiudades.length; i++) {
      try {
        const data = await obtenerClimaActual(listaCiudades[i]);

        lugares.value.push({
          id: i,
          nombre: listaCiudades[i],
          tempActual: Math.round(data.main.temp),
          estadoActual: data.weather[0].description,
          icono: data.weather[0].icon
        });

      } catch (error) {
        console.error(error);
      }
    }

    loading.value = false;
  }

  return {
    lugares,
    loading,
    cargarClima
  };
}