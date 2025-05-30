const { calculo, CalcularMonto, Deducciones } = require("../utils/function");
const {
  porcentajes,
  dias,
  horas,
  auxilios,
  deducciones,
} = require("../utils/DatosRemuneracion.json");

function calcular(req, res) {
  const { HED, HEN, HEDDF, HENDF, RNO, RDDF, RNDF, SB, DT } = req.body;
  if (!HED || !HEN) {
    return res
      .status(400)
      .json({ error: "Se requieren datos para realizar el calulo." });
  }

  const valorDia = calculo(SB, dias);
  const valorHora = calculo(SB, horas);
  const AuxilioConectividad = calculo(auxilios.conecitvidad, dias) * DT;

  let THED = CalcularMonto(valorHora, HED, porcentajes.HED);
  let THEN = CalcularMonto(valorHora, HEN, porcentajes.HEN);
  let THEDDF = CalcularMonto(valorHora, HEDDF, porcentajes.HEDDF);
  let THENDF = CalcularMonto(valorHora, HENDF, porcentajes.HENDF);
  let TRNO = CalcularMonto(valorHora, RNO, porcentajes.RNO);
  let TRDDF = CalcularMonto(valorHora, RDDF, porcentajes.RDDF);
  let TRNDF = CalcularMonto(valorHora, RNDF, porcentajes.RNDF);

  let TotalRecarosHoras = THED + THEN + THEDDF + THENDF + TRNO + TRDDF + TRNDF;
  console.log(TotalRecarosHoras);
  let TotalIngreso = TotalRecarosHoras + DT * valorDia;
  let TotalDeducciones = Deducciones(
    TotalIngreso,
    deducciones.pension,
    deducciones.salud
  );
  let NetoPagar = TotalIngreso + AuxilioConectividad - TotalDeducciones;

  res.json({
    THED,
    THEN,
    THEDDF,
    THENDF,
    TRNO,
    TRDDF,
    TRNDF,
    TotalRecarosHoras,
    AuxilioConectividad,
    TotalIngreso,
    TotalDeducciones,
    NetoPagar,
  });
}

module.exports = { calcular };
