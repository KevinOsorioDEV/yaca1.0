const express = require("express");
const router = express.Router();
const { calcular } = require("../controllers/calculoController");

router.post("/calcular", calcular);

module.exports = router;
