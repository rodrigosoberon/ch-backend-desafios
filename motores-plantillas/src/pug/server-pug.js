const express = require("express");
const app = express();
const port = 8080;
const productos = require("../../modules/productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../../public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/productos", productos);

const server = app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
