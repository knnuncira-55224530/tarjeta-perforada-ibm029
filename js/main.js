// CONTROLADOR: conecta la vista con la lógica de negocio.
document.addEventListener("DOMContentLoaded", function () {
  Vista.iniciar();
  let tarjeta = Codificador.tarjetaVacia();

  function refrescar() {
    const impreso = Decodificador.tarjetaATexto(tarjeta).texto;
    Vista.dibujarTarjeta(tarjeta, impreso, alternarPerforacion);
  }

  function alternarPerforacion(col, fila) {
    const i = tarjeta[col].indexOf(fila);
    if (i >= 0) tarjeta[col].splice(i, 1); else tarjeta[col].push(fila);
    refrescar();
  }

  Vista.el.btnPerforar.addEventListener("click", function () {
    const r = Codificador.textoATarjeta(Vista.leerEntrada());
    tarjeta = r.tarjeta;
    refrescar();
    if (r.invalidos.length) {
      Vista.mostrarMensaje("Estos caracteres no existen en IBM 029 y quedaron sin perforar: " + r.invalidos.join(" "), true);
    } else if (r.truncado) {
      Vista.mostrarMensaje("El texto pasa de 80 caracteres; se perforaron solo las primeras 80 columnas.", true);
    } else {
      Vista.mostrarMensaje("Tarjeta perforada.", false);
    }
  });

  Vista.el.btnLeer.addEventListener("click", function () {
    const r = Decodificador.tarjetaATexto(tarjeta);
    Vista.mostrarSalida(r.texto.trimEnd());
    if (r.desconocidas.length) {
      Vista.mostrarMensaje("Combinación no válida en IBM 029 (aparece como ?) en las columnas: " + r.desconocidas.join(", "), true);
    } else {
      Vista.mostrarMensaje("Tarjeta leída.", false);
    }
  });

  Vista.el.btnLimpiar.addEventListener("click", function () {
    tarjeta = Codificador.tarjetaVacia();
    Vista.limpiarEntrada();
    Vista.mostrarSalida("");
    Vista.mostrarMensaje("Tarjeta en blanco.", false);
    refrescar();
  });

  refrescar();
});