import { defineStore } from "pinia";
import {
  obtenerClimaActual,
  obtenerPronostico,
} from "../services/WeatherConexion";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    lugares: [],
    climaActual: null,
    alerta: null,
    pronostico: [],
    loading: false,
    error: null,
  }),

  actions: {
    async cargarClimaCiudades() {
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
        "Bogota",
      ];

      this.loading = true;
      this.lugares = [];

      try {
        for (let i = 0; i < listaCiudades.length; i++) {
          const data = await obtenerClimaActual(listaCiudades[i]);

          this.lugares.push({
            id: i,
            nombre: listaCiudades[i],
            tempActual: Math.round(data.main.temp),
            estadoActual: data.weather[0].description,
            icono: data.weather[0].icon,
          });
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async cargarDetalles(ciudad) {
      this.loading = true;
      this.error = null;

      try {
        const actual = await obtenerClimaActual(ciudad);
        const forecast = await obtenerPronostico(ciudad);

        this.climaActual = {
          nombre: ciudad,
          temp: Math.round(actual.main.temp),
          descripcion: actual.weather[0].description,
          icono: actual.weather[0].icon,
          humedad: actual.main.humidity,
          viento: actual.wind.speed.toFixed(1),
        };

        this.pronostico = forecast.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 5)
          .map((item) => ({
            dia: item.dt_txt.split(" ")[0],
            tempActual: Math.round(item.main.temp),
            min: Math.round(item.main.temp_min),
            max: Math.round(item.main.temp_max),
            estado: item.weather[0].description,
            icono: item.weather[0].icon,
            humedad: item.main.humidity,
            viento: item.wind.speed,
          }));
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
