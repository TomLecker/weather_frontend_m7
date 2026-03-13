import { ref } from 'vue'
import { Lugar } from '../models/Lugar'
import { obtenerClimaActual } from '../services/WeatherConexion'

export function useWeather() {
  const lugares = ref([])

  function inicializarLugares() {
    lugares.value = [
      new Lugar(1, "Madrid"),
      new Lugar(2, "Barcelona"),
      new Lugar(3, "Valencia"),
      new Lugar(4, "Sevilla"),
      new Lugar(5, "Bilbao"),
      new Lugar(6, "Santiago"),
      new Lugar(7, "Lima"),
      new Lugar(8, "Moscu"),
      new Lugar(9, "Caracas"),
      new Lugar(10, "Bogota")
    ]
  }

  async function cargarClima() {
    for (const lugar of lugares.value) {
      try {
        const apiData = await obtenerClimaActual(lugar.nombre)

        lugar.tempActual = Math.round(apiData.main.temp)
        lugar.estadoActual = apiData.weather[0].description
        lugar.icono = apiData.weather[0].icon
      } catch (error) {
        console.error(`Error con ${lugar.nombre}`, error)
      }
    }

    localStorage.setItem("lugares", JSON.stringify(lugares.value))
  }

  return {
    lugares,
    inicializarLugares,
    cargarClima
  }
}