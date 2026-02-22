export function mapearPronosticoSemanal(apiData) {
  const lista = apiData.list;
  const resultado = [];

  for (let d = 0; d < 6; d++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + d);
    const dia = fecha.toISOString().split("T")[0];

    const delDia = lista.filter(item =>
      item.dt_txt.startsWith(dia)
    );

    if (!delDia.length) continue;

    const min = Math.round(Math.min(...delDia.map(i => i.main.temp_min)));
    const max = Math.round(Math.max(...delDia.map(i => i.main.temp_max)));
    const estado = delDia[0].weather[0].description;
    const icono = delDia[0].weather[0].icon;
    const tempActual = Math.round(delDia[0].main.temp);

    const viento = (
      delDia.reduce((acc, i) => acc + i.wind.speed, 0) /
      delDia.length
    ).toFixed(1);

    const humedad = Math.round(
      delDia.reduce((acc, i) => acc + i.main.humidity, 0) /
      delDia.length
    );

    resultado.push({
      dia,
      min,
      max,
      estado,
      icono,
      viento,
      humedad,
      tempActual
    });
  }

  return resultado;
}

export function mayorTemperatura(pronosticos) {
  return Math.max(...pronosticos.map(p => p.max));
}

export function menorTemperatura(pronosticos) {
  return Math.min(...pronosticos.map(p => p.min));
}

export function promedioTemperaturas(pronosticos) {
  const suma = pronosticos.reduce(
    (acc, p) => acc + (p.min + p.max) / 2,
    0
  );
  return Math.round(suma / pronosticos.length);
}

export function estadoSemanal(pronosticos) {
  const estados = pronosticos.map(p => p.estado);

  return estados
    .sort(
      (a, b) =>
        estados.filter(v => v === a).length -
        estados.filter(v => v === b).length
    )
    .pop();
}

export function alertaSemanal(pronosticos) {
  const tempProm = promedioTemperaturas(pronosticos);
  const estado = estadoSemanal(pronosticos);

  if (tempProm >= 25)
    return { mensaje: "⚠️ Alerta por altas temperaturas esta semana" };

  if (tempProm <= 5)
    return { mensaje: "⚠️ Alerta por bajas temperaturas esta semana" };

  if (estado?.toLowerCase().includes("lluvia"))
    return { mensaje: "☔ Semana con lluvias frecuentes" };

  return null;
}