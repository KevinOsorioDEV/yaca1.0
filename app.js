const express = require("express");
const app = express();
const port = 3000;
const calculoRouters = require("./routes/calcularRoute");

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use("/api", calculoRouters);

app.listen(PORT, () => {
  console.log(`Runnin port link ${port}`);
});
