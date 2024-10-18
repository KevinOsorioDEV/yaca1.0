const express = require("express");
const app = express();
const port = 3000;
const calculoRouters = require("./routes/calcularRoute");

app.use(express.json());

app.use("/api", calculoRouters);

app.listen(port, () => {
  console.log(`Runnin port link ${port}`);
});
