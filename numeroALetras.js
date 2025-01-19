function numeroALetras(numero) {
  const unidades = [
    "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"
  ];
  const decenas = [
    "", "diez", "veinte", "treinta", "cuarenta", "cincuenta",
    "sesenta", "setenta", "ochenta", "noventa"
  ];
  const centenas = [
    "", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos",
    "seiscientos", "setecientos", "ochocientos", "novecientos"
  ];
  const especiales = {
    11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince",
    16: "dieciséis", 17: "diecisiete", 18: "dieciocho", 19: "diecinueve",
    21: "veintiuno", 22: "veintidós", 23: "veintitrés", 24: "veinticuatro",
    25: "veinticinco", 26: "veintiséis", 27: "veintisiete", 28: "veintiocho", 29: "veintinueve"
  };

  function convertirSeccion(num) {
    if (num === 0) return "cero";
    if (num in especiales) return especiales[num];
    const c = Math.floor(num / 100);
    const d = Math.floor((num % 100) / 10);
    const u = num % 10;
    const centenasTexto = c ? (c === 1 && num % 100 === 0 ? "cien" : centenas[c]) : "";
    const decenasTexto = d ? (d === 1 || (d === 2 && u === 0) ? decenas[d] : decenas[d] + (u > 0 ? " y " : "")) : "";
    const unidadesTexto = d === 1 ? "" : unidades[u];
    return [centenasTexto, decenasTexto, unidadesTexto].filter(Boolean).join(" ");
  }

  function convertirGrupo(grupo, nivel) {
    const niveles = ["", "mil", "millón", "mil millones", "billón"];
    const texto = convertirSeccion(grupo);
    if (!texto) return "";
    return `${texto} ${nivel > 0 && texto !== "uno" ? niveles[nivel] + "es" : niveles[nivel]}`.trim();
  }

  function convertirEntero(num) {
    if (num === 0) return "cero";
    const grupos = [];
    let nivel = 0;
    while (num > 0) {
      grupos.push(convertirGrupo(num % 1000, nivel));
      num = Math.floor(num / 1000);
      nivel++;
    }
    return grupos.reverse().filter(Boolean).join(" ");
  }

  function convertirDecimal(num) {
    if (!num) return "";
    return `con ${convertirEntero(num)} centavos`;
  }

  const [entero, decimal] = numero.toString().split(".").map(Number);
  return `${convertirEntero(entero)} ${decimal ? convertirDecimal(decimal) : ""}`.trim();
}
