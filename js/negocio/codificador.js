// CAPA DE NEGOCIO: texto -> tarjeta perforada.
// Una tarjeta es un arreglo de 80 columnas; cada columna es un arreglo con las filas perforadas.
const Codificador = {
  COLUMNAS: 80,

  tarjetaVacia: function () {
    return Array.from({ length: this.COLUMNAS }, function () { return []; });
  },

  textoATarjeta: function (texto) {
    const t = texto.toUpperCase();
    const tarjeta = this.tarjetaVacia();
    const invalidos = [];

    for (let i = 0; i < Math.min(t.length, this.COLUMNAS); i++) {
      const clave = TablaIBM029.mapa[t[i]];
      if (clave === undefined) {
        invalidos.push(t[i]);
      } else if (clave !== "") {
        tarjeta[i] = clave.split("-");
      }
    }
    return { tarjeta: tarjeta, invalidos: invalidos, truncado: t.length > this.COLUMNAS };
  }
};