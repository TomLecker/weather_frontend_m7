const API_KEY = process.env.VUE_APP_API_KEY

// ===============================
// API
// ===============================
// Obtiene el clima actual para una ciudad dada
export async function obtenerClimaActual(ciudad) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
  );
  if (!res.ok) throw new Error("Error al obtener clima actual");
  return res.json();
}

// Obtiene el pronóstico semanal para una ciudad dada
export async function obtenerPronostico(ciudad) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
  );
  if (!res.ok) throw new Error("Error al obtener pronóstico");
  return res.json();
}
