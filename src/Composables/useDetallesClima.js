import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  obtenerClimaActual,
  obtenerPronostico
} from "@/services/WeatherConexion";

export function useDetallesClima() {
  const route = useRoute();
  const ciudad = route.params.ciudad;

  const clima = ref(null);
  const pronostico = ref([]);
  const loading = ref(false);

  async function cargarDetalles() {
    loading.value = true;

    try {
      const actual = await obtenerClimaActual(ciudad);
      const forecast = await obtenerPronostico(ciudad);

      clima.value = {
        nombre: ciudad,
        temp: Math.round(actual.main.temp),
        descripcion: actual.weather[0].description,
        icono: actual.weather[0].icon,
        humedad: actual.main.humidity,
        viento: actual.wind.speed.toFixed(1)
      };

      // Tomamos 5 días (uno por día aprox)
      pronostico.value = forecast.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map(item => ({
          fecha: item.dt_txt.split(" ")[0],
          temp: Math.round(item.main.temp),
          descripcion: item.weather[0].description,
          icono: item.weather[0].icon
        }));

    } catch (error) {
      console.error(error);
    }

    loading.value = false;
  }

  return {
    clima,
    pronostico,
    loading,
    cargarDetalles
  };
}