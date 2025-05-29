const { Hora, CalcularMonto, Deducciones } = require("../utils/function");
const {
  porcentajes,
  salariobase,
  dias,
  auxilios,
  deducciones,
} = require("../utils/DatosRemuneracion.json");

function calcular(req, res) {
  const { HED, HEN, HEDDF, HENDF, RNO, RDDF, RNDF, SB } = req.body;
  // // if (!HED || !HEN) {
  // //   return res
  // //     .status(400)
  // //     .json({ error: "Se requieren datos para realizar el calulo." });
  // // }

  const VlHora = Hora(SB, dias);
  const AuxiloTransport = auxilios.transporte;

  let THED = CalcularMonto(VlHora, HED, porcentajes.HED);
  let THEN = CalcularMonto(VlHora, HEN, porcentajes.HEN);
  let THEDDF = CalcularMonto(VlHora, HEDDF, porcentajes.HEDDF);
  let THENDF = CalcularMonto(VlHora, HENDF, porcentajes.HENDF);
  let TRNO = CalcularMonto(VlHora, RNO, porcentajes.RNO);
  let TRDDF = CalcularMonto(VlHora, RDDF, porcentajes.RDDF);
  let TRNDF = CalcularMonto(VlHora, RNDF, porcentajes.RNDF);

  let TotalRecarosHoras = THED + THEN + THEDDF + THENDF + TRNO + TRDDF + TRNDF;
  let TotalIngreso = TotalRecarosHoras + SB + AuxiloTransport;
  let TotalDeducciones = Deducciones(
    TotalRecarosHoras + SB,
    deducciones.pension,
    deducciones.salud
  );
  let NetoPagar = TotalIngreso - TotalDeducciones;

  res.json({
    THED,
    THEN,
    THEDDF,
    THENDF,
    TRNO,
    TRDDF,
    TRNDF,
    TotalRecarosHoras,
    "Salario Base": SB.data,
    AuxiloTransport,
    TotalIngreso,
    TotalDeducciones,
    NetoPagar,
  });
}

module.exports = { calcular };
