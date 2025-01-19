function unidades(num) {
  switch (num) {
    case 1: return 'UN';
    case 2: return 'DOS';
    case 3: return 'TRES';
    case 4: return 'CUATRO';
    case 5: return 'CINCO';
    case 6: return 'SEIS';
    case 7: return 'SIETE';
    case 8: return 'OCHO';
    case 9: return 'NUEVE';
    default: return '';
  }
}

function decenas(num) {
  var decena = Math.floor(num / 10);
  var unidad = num - (decena * 10);
  switch (decena) {
    case 1:
      switch (unidad) {
        case 0: return 'DIEZ';
        case 1: return 'ONCE';
        case 2: return 'DOCE';
        case 3: return 'TRECE';
        case 4: return 'CATORCE';
        case 5: return 'QUINCE';
        default: return 'DIECI' + unidades(unidad);
      }
    case 2:
      return unidad === 0 ? 'VEINTE' : 'VEINTI' + unidades(unidad);
    case 3: return decenasY('TREINTA', unidad);
    case 4: return decenasY('CUARENTA', unidad);
    case 5: return decenasY('CINCUENTA', unidad);
    case 6: return decenasY('SESENTA', unidad);
    case 7: return decenasY('SETENTA', unidad);
    case 8: return decenasY('OCHENTA', unidad);
    case 9: return decenasY('NOVENTA', unidad);
    case 0: return unidades(unidad);
  }
}

function decenasY(strSin, numUnidades) {
  return numUnidades > 0 ? strSin + ' Y ' + unidades(numUnidades) : strSin;
}

function centenas(num) {
  var centenas = Math.floor(num / 100);
  var decenasResto = num - (centenas * 100);
  switch (centenas) {
    case 1: return decenasResto > 0 ? 'CIENTO ' + decenas(decenasResto) : 'CIEN';
    case 2: return 'DOSCIENTOS ' + decenas(decenasResto);
    case 3: return 'TRESCIENTOS ' + decenas(decenasResto);
    case 4: return 'CUATROCIENTOS ' + decenas(decenasResto);
    case 5: return 'QUINIENTOS ' + decenas(decenasResto);
    case 6: return 'SEISCIENTOS ' + decenas(decenasResto);
    case 7: return 'SETECIENTOS ' + decenas(decenasResto);
    case 8: return 'OCHOCIENTOS ' + decenas(decenasResto);
    case 9: return 'NOVECIENTOS ' + decenas(decenasResto);
    default: return decenas(decenasResto);
  }
}

function seccion(num, divisor, strSingular, strPlural) {
  var cientos = Math.floor(num / divisor);
  var resto = num - (cientos * divisor);
  var letras = '';
  if (cientos > 0) {
    letras = cientos > 1 ? centenas(cientos) + ' ' + strPlural : strSingular;
  }
  if (resto > 0) {
    letras += '';
  }
  return letras;
}

function miles(num) {
  var divisor = 1000;
  var cientos = Math.floor(num / divisor);
  var resto = num - (cientos * divisor);
  var strMiles = seccion(num, divisor, 'UN MIL', 'MIL');
  var strCentenas = centenas(resto);
  return strMiles === '' || cientos === 0 ? strCentenas : strMiles + ' ' + strCentenas;
}

function millones(num) {
  var divisor = 1000000;
  var cientos = Math.floor(num / divisor);
  var resto = num - (cientos * divisor);
  var strMillones = seccion(num, divisor, millon(num, true), millon(num, false));
  var strMiles = miles(resto);
  return strMillones === '' || cientos === 0 ? strMiles : strMillones + ' ' + strMiles;
}

function millon(num, singular) {
  var letraMillon = singular ? 'UN MILLON' : 'MILLONES';
  if (num % 1000000 === 0) {
    letraMillon += ' DE';
  }
  return letraMillon;
}

function numberAsString(num, centavos, currency) {
  centavos = centavos || false;
  currency = currency || {};
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: centavos ? Math.round((num - Math.floor(num)) * 100) : 0,
    letrasCentavos: '',
    letrasMonedaPlural: currency.plural || 'PESOS',
    letrasMonedaSingular: currency.singular || 'PESO',
    letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
    letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
  };

  if (data.centavos > 0) {
    var centavosTexto = data.centavos === 1
      ? millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular
      : millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
    data.letrasCentavos = 'CON ' + centavosTexto;
  }

  if (data.enteros === 0) {
    return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
  }
  if (data.enteros === 1) {
    return millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
  }
  return millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
}
