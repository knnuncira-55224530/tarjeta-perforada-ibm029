// CAPA DE VISTA: solo dibuja y lee del HTML. No tiene lógica de códigos.
const Vista = {
  el: {},

  iniciar: function () {
    const id = function (x) { return document.getElementById(x); };
    this.el = {
      entrada: id("entrada"), tarjeta: id("tarjeta"), salida: id("salida"), mensaje: id("mensaje"),
      btnPerforar: id("btnPerforar"), btnLeer: id("btnLeer"), btnLimpiar: id("btnLimpiar")
    };
  },

  _div: function (clase, texto) {
    const d = document.createElement("div");
    d.className = clase;
    if (texto) d.textContent = texto;
    return d;
  },

  // impreso: texto de 80 caracteres que se muestra impreso arriba de cada columna
  dibujarTarjeta: function (tarjeta, impreso, alClickCelda) {
    const self = this;
    const rejilla = this._div("rejilla");
    rejilla.appendChild(this._div("esquina"));
    tarjeta.forEach(function (_, c) {
      rejilla.appendChild(self._div("impreso", impreso[c] === " " ? "" : impreso[c]));
    });

    TablaIBM029.FILAS.forEach(function (fila) {
      rejilla.appendChild(self._div("etiqueta-fila", fila));
      tarjeta.forEach(function (columna, c) {
        const perforada = columna.includes(fila);
        const celda = self._div("celda" + (perforada ? " perforada" : ""), /^\d$/.test(fila) ? fila : "");
        celda.dataset.col = c;
        celda.dataset.fila = fila;
        celda.title = "Columna " + (c + 1) + ", fila " + fila;
        rejilla.appendChild(celda);
      });
    });

    rejilla.addEventListener("click", function (e) {
      const celda = e.target.closest(".celda");
      if (celda) alClickCelda(Number(celda.dataset.col), celda.dataset.fila);
    });

    const hoja = this._div("hoja");
    hoja.appendChild(rejilla);
    const scroll = this.el.tarjeta.scrollLeft;
    this.el.tarjeta.replaceChildren(hoja);
    this.el.tarjeta.scrollLeft = scroll;
  },

  leerEntrada: function () { return this.el.entrada.value; },
  limpiarEntrada: function () { this.el.entrada.value = ""; },
  mostrarSalida: function (texto) { this.el.salida.textContent = texto; },
  mostrarMensaje: function (texto, esError) {
    this.el.mensaje.textContent = texto;
    this.el.mensaje.className = esError ? "error" : "";
  }
};