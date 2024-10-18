function Hora(salario, dias) {
  var hora = salario / dias;
  return Math.ceil(hora);
}

function Deducciones(salario, pension, salud) {
  let deduccion = salario * pension + salario * salud;
  return deduccion;
}

function CalcularMonto(valorHora, totalHora, porcentaje) {
  let valorTotalHora = valorHora * porcentaje * totalHora;
  return valorTotalHora;
}

module.exports = { Hora, Deducciones, CalcularMonto };
