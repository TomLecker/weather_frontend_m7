import { useWeatherStore } from "../stores/weatherStore"

export function useClimaActual() {

  const weatherStore = useWeatherStore()

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
  ]

  async function cargarClima() {

    for (let i = 0; i < listaCiudades.length; i++) {
      await weatherStore.getClima(listaCiudades[i])
    }

  }

  return {
    climaActual: weatherStore.climaActual,
    loading: weatherStore.loading,
    cargarClima
  }

}