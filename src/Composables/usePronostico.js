import { ref } from "vue";
import { obtenerPronostico } from "../services/WeatherConexion";
import {
  mapearPronosticoSemanal,
  alertaSemanal
} from "../Utils/pronostico";

export function usePronostico() {
  const pronostico = ref([]);
  const alerta = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function cargarPronostico(ciudad) {
    try {
      loading.value = true;
      error.value = null;

      const data = await obtenerPronostico(ciudad);

      pronostico.value = mapearPronosticoSemanal(data);
      alerta.value = alertaSemanal(pronostico.value);

    } catch (err) {
      error.value = "No se pudo cargar el pronóstico";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    pronostico,
    alerta,
    loading,
    error,
    cargarPronostico
  };
}