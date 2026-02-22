// ===============================
// INIT
// ===============================
// Al cargar el documento, obtiene la ciudad de la URL y carga los datos correspondientes
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const ciudad = route.query.ciudad

    onMounted(() => {
      cargarClima(ciudad)
    })
  }
}
// ===============================
// AUX
// ===============================
// Obtiene el nombre de la ciudad desde los parámetros de la URL
function obtenerCiudadDeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ciudad");
}


function mapearPronosticoSemanal(apiData) {
  const lista = apiData.list;
  const pronostico = [];

  for (let d = 0; d < 6; d++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + d);
    const dia = fecha.toISOString().split("T")[0];

    const delDia = lista.filter(item => item.dt_txt.startsWith(dia));
    if (!delDia.length) continue;

    const min = Math.round(Math.min(...delDia.map(i => i.main.temp_min)));
    const max = Math.round(Math.max(...delDia.map(i => i.main.temp_max)));
    const estado = delDia[0].weather[0].description;
    const icono = delDia[0].weather[0].icon;

    // temperatura “actual” para la tarjeta: primer registro del día
    const tempActual = Math.round(delDia[0].main.temp);

    const viento = (delDia.reduce((acc, i) => acc + i.wind.speed, 0) / delDia.length).toFixed(1);
    const humedad = Math.round(delDia.reduce((acc, i) => acc + i.main.humidity, 0) / delDia.length);

    pronostico.push({ dia, min, max, estado, icono, viento, humedad, tempActual });
  }

  return pronostico;
}

// ===============================
// UI
// ===============================
function renderClimaActual(clima) {
  const contenedor = $("#climaActual");
  contenedor.empty();

  const iconUrl = `https://openweathermap.org/img/wn/${clima.icono}@2x.png`;

  contenedor.append(`
    <div class="card card--main text-center">
      <h5>Clima actual</h5>
      <img src="${iconUrl}" alt="${clima.estado}">
      
      <p style="text-transform:capitalize">${clima.estadoActual}</p>
      <p>🌡️ ${clima.tempActual}°C</p>
      <p>💧 Humedad: ${clima.humedad}%</p>
      <p>💨 Viento: ${clima.viento} m/s</p>
    </div>
  `);
}

function renderPronostico(pronostico) {
  const contenedor = $("#pronostico");
  contenedor.empty();

  pronostico.forEach(p => {
    const iconUrl = `https://openweathermap.org/img/wn/${p.icono}@2x.png`;

    contenedor.append(`
      <div class="card card--main h-100 text-center">
        <div class="card__body">
          <h5 class="card__title">${p.dia}</h5>
          <img src="${iconUrl}" alt="${p.estadoActual}">
          <p class="temp-actual">🌡️<b> ${p.tempActual} °C</b></p>
          <p style="text-transform:capitalize">${p.estado}</p>
          <p>🌡️ Min ${p.min}°C / Max ${p.max}°C</p>
          <p>💧 Humedad: ${p.humedad}%</p>
          <p>💨 Viento: ${p.viento} m/s</p>
        </div>
      </div>
    `);
  });
}

function renderAlertaSemanal(alerta) {
  const contenedor = $("#alertaSemanal");
  contenedor.empty();

  if (!alerta) return;

  contenedor.append(`
    <div class="alert alert-warning text-center">
      ${alerta.mensaje}
    </div>
  `);
}

// ===============================
// MAIN
// ===============================
// Carga y muestra el clima actual y el pronóstico semanal para una ciudad dada
async function cargarClimaActual(ciudad) {
  try {
    const data = await obtenerClimaActual(ciudad);
    const clima = app.mapearClimaActual(data);
    renderClimaActual(clima);
  } catch (error) {
    console.error(error);
    $("#climaActual").text("No se pudo cargar el clima actual.");
  }
}

async function cargarPronostico(ciudad) {
  try {
    const apiData = await obtenerPronostico(ciudad);
    const pronostico = mapearPronosticoSemanal(apiData);
    const alerta = alertaSemanal(pronostico);

    renderPronostico(pronostico);
    renderResumenSemanal(pronostico);
    renderAlertaSemanal(alerta);
  } catch (error) {
    console.error(error);
    $("#detallesTarjeta").text("No se pudo cargar el pronóstico.");
  }
}



// Función para obtener la mayor temperatura máxima de un conjunto de pronósticos

function MayorTemperatura(pronosticos) {
  const maxima = Math.max(...pronosticos.map(p => p.max));
  return  maxima;
}
// spread operator (...) para extraer las temperaturas máximas de cada pronóstico
// y luego aplicar Math.max para encontrar la mayor de ellas.

function MenorTemperatura(pronosticos) {
  const minima = Math.min(...pronosticos.map(p => p.min));

  return minima;
}
// Función para calcular la temperatura promedio de un conjunto de pronósticos


function promedioTemperaturas(pronosticos) {
  const suma = pronosticos.reduce((acc, p) => acc + (p.min + p.max) / 2, 0);
  const prom = Math.round(suma / pronosticos.length);
  return prom;
}

function alertaSemanal(pronostico) {
  const tempProm = promedioTemperaturas(pronostico);
  const estado = estadoSemanal(pronostico);

  if (tempProm >= 25) {
    return {
      tipo: "calor",
      mensaje: "⚠️ Alerta por altas temperaturas esta semana"
    };
  }

  if (tempProm <= 5) {
    return {
      tipo: "frio",
      mensaje: "⚠️ Alerta por bajas temperaturas esta semana"
    };
  }

  if (estado.toLowerCase().includes("lluvia")) {
    return {
      tipo: "lluvia",
      mensaje: "☔ Semana con lluvias frecuentes"
    };
  }

  return null;
}

// Función para determinar el estado del tiempo más común en un conjunto de pronósticos
// Utiliza un enfoque de conteo y ordenamiento para encontrar el estado más frecuente.
// La función map crea un array de estados, luego se ordena basado en la frecuencia de cada estado
// y se selecciona el último elemento (el más frecuente).
// Esto permite identificar rápidamente el estado del tiempo predominante en la semana.



function estadoSemanal(pronosticos) {
  const estados = pronosticos.map(p => p.estado);
  const estadoMasComun = estados.sort(
    (a, b) =>
      estados.filter(v => v === a).length -
      estados.filter(v => v === b).length
  ).pop();
  return estadoMasComun;
}

function renderResumenSemanal(pronostico) {
  $("#tempMaxSemana").text(`🌡️ Máxima semanal: ${MayorTemperatura(pronostico)}°C`);
  $("#tempMinSemana").text(`❄️ Mínima semanal: ${MenorTemperatura(pronostico)}°C`);
  $("#promedioTempSemana").text(`📊 Promedio semanal: ${promedioTemperaturas(pronostico)}°C`);
  $("#estadoSemana").text(`☁️ Estado predominante: ${estadoSemanal(pronostico)}`);
}