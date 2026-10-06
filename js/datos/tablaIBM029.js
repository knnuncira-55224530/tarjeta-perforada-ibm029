// CAPA DE DATOS: tabla del código IBM 029.
// Cada carácter se guarda como las filas perforadas de su columna, separadas por "-".
// Filas de la tarjeta de arriba hacia abajo: 12, 11, 0, 1, 2 ... 9
const TablaIBM029 = (function () {
  const FILAS = ["12", "11", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const mapa = { " ": "" }; // espacio = columna sin perforar

  "0123456789".split("").forEach(function (d) { mapa[d] = d; });
  "ABCDEFGHI".split("").forEach(function (c, i) { mapa[c] = "12-" + (i + 1); });
  "JKLMNOPQR".split("").forEach(function (c, i) { mapa[c] = "11-" + (i + 1); });
  "STUVWXYZ".split("").forEach(function (c, i) { mapa[c] = "0-" + (i + 2); });

  Object.assign(mapa, {
    "&": "12", "-": "11",
    "¢": "12-2-8", ".": "12-3-8", "<": "12-4-8", "(": "12-5-8", "+": "12-6-8", "|": "12-7-8",
    "!": "11-2-8", "$": "11-3-8", "*": "11-4-8", ")": "11-5-8", ";": "11-6-8", "¬": "11-7-8",
    "/": "0-1", ",": "0-3-8", "%": "0-4-8", "_": "0-5-8", ">": "0-6-8", "?": "0-7-8",
    ":": "2-8", "#": "3-8", "@": "4-8", "'": "5-8", "=": "6-8", "\"": "7-8"
  });

  return { FILAS: FILAS, mapa: mapa };
})();