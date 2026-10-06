// CAPA DE NEGOCIO: tarjeta perforada -> texto.
const Decodificador = {
  _inverso: null,

  _tablaInversa: function () {
    if (!this._inverso) {
      this._inverso = {};
      for (const caracter in TablaIBM029.mapa) {
        this._inverso[TablaIBM029.mapa[caracter]] = caracter;
      }
    }
    return this._inverso;
  },

  // Devuelve un texto de 80 caracteres ("?" si la combinación no existe en IBM 029)
  tarjetaATexto: function (tarjeta) {
    const inverso = this._tablaInversa();
    let texto = "";
    const desconocidas = [];

    tarjeta.forEach(function (columna, i) {
      // se ordenan las filas como en la tarjeta para armar la clave, ej. "12-3-8"
      const clave = TablaIBM029.FILAS.filter(function (f) { return columna.includes(f); }).join("-");
      const caracter = inverso[clave];
      if (caracter === undefined) {
        texto += "?";
        desconocidas.push(i + 1);
      } else {
        texto += caracter;
      }
    });
    return { texto: texto, desconocidas: desconocidas };
  }
};