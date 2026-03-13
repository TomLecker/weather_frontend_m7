import { useRoute } from "vue-router"
import { useWeatherStore } from "../stores/weatherStore"

export function useDetallesClima() {

  const weatherStore = useWeatherStore()
  const route = useRoute()

  const ciudad = route.params.ciudad

  async function cargarDetalles() {
    await weatherStore.cargarDetalles(ciudad)
  }

  return {
    clima: weatherStore.climaActual,
    pronostico: weatherStore.pronostico,
    loading: weatherStore.loading,
    cargarDetalles
  }

}