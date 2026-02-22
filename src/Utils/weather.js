// ===============================
// CONFIGURACIÓN / MODELOS
// ===============================

class Lugar {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.tempActual = null;
    this.estadoActual = null;
    this.icono = null;
    this.pronosticoSemanal = [];
  }
}

class WeatherApp {
  constructor() {
    this.lugares = [];
  }

  mapearClimaActual(data) {
  return {
    tempActual: Math.round(data.main.temp),
    estadoActual: data.weather[0].description,
    icono: data.weather[0].icon,
    humedad: data.main.humidity,
    viento: data.wind.speed.toFixed(1),
  };
}

  agregarLugar(lugar) {
    this.lugares.push(lugar);
  }

  inicializarLugares() {
    this.agregarLugar(new Lugar(1, "Madrid"));
    this.agregarLugar(new Lugar(2, "Barcelona"));
    this.agregarLugar(new Lugar(3, "Valencia"));
    this.agregarLugar(new Lugar(4, "Sevilla"));
    this.agregarLugar(new Lugar(5, "Bilbao"));
    this.agregarLugar(new Lugar(6, "Santiago"));
    this.agregarLugar(new Lugar(7, "Lima"));
    this.agregarLugar(new Lugar(8, "Moscu"));
    this.agregarLugar(new Lugar(9, "Caracas"));
    this.agregarLugar(new Lugar(10, "Bogota"));
  }

  async cargarClima() {
    const contenedor = document.getElementById("contenedorTarjetas");

    if (!contenedor) return; //Evita error en consola al cargar el documento en detalles.html

    contenedor.innerHTML = "";

    for (const lugar of this.lugares) {
      try {
        const apiData = await obtenerClimaActual(lugar.nombre);
        const clima = this.mapearClimaActual(apiData);

        lugar.tempActual = clima.tempActual;
        lugar.estadoActual = clima.estadoActual;
        lugar.icono = clima.icono;

        contenedor.innerHTML += crearTarjeta(lugar);
      } catch (error) {
        console.error(`Error con ${lugar.nombre}`, error);
      }
    }

    localStorage.setItem("lugares", JSON.stringify(this.lugares));
  }

  verDetalles(ciudad) {
    window.location.href = `detalles.html?ciudad=${encodeURIComponent(ciudad)}`;
  }
}

// ===============================
// INSTANCIA APP
// ===============================

const app = new WeatherApp();
app.inicializarLugares();

// ===============================
// UI
// ===============================

function crearTarjeta(lugar) {
  const iconUrl = `https://openweathermap.org/img/wn/${lugar.icono}@2x.png`;

  return `
    <div class="card card--main h-100 text-center">
      <div class="card__body">
        <h5 class="card__title">${lugar.nombre}</h5>

        <img src="${iconUrl}" alt="${lugar.estadoActual}">
        <p style="text-transform:capitalize">${lugar.estadoActual}</p>
        <p class="temp">🌡️ <b>${lugar.tempActual}°C</b></p>

        <a href="#"
           class="btn btn-primary"
           onclick="app.verDetalles('${lugar.nombre}')">
          Ver detalle
        </a>
      </div>
    </div>
  `;
}

// ===============================
// INIT
// ===============================

app.cargarClima();