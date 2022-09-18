const express = require("express");
const productos = require("./modules/productos");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productos);
app.use(express.static("./public"));

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
