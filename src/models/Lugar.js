export class Lugar {
  constructor(id, nombre) {
    this.id = id
    this.nombre = nombre
    this.tempActual = null
    this.estadoActual = null
    this.icono = null
    this.pronosticoSemanal = []
  }
}