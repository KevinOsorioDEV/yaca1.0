function calculo(salario, diaHora) {
  var valorDia = salario / diaHora;
  return Math.ceil(valorDia);
}

function Deducciones(salario, pension, salud) {
  let deduccion = salario * pension + salario * salud;
  return deduccion;
}

function CalcularMonto(valorHora, totalHora, porcentaje) {
  let valorTotalHora = valorHora * porcentaje * totalHora;
  return valorTotalHora;
}

module.exports = { calculo, Deducciones, CalcularMonto };
