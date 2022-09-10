import express from "express";
import { Contenedor } from "./contenedor.js";
const PORT = 8080;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

const contenedor = new Contenedor("./productos.txt");

app.get("/productos", (req, res) => {
  (async () => {
    res.send(await contenedor.getAll());
  })();
});

app.get("/productoRandom", (req, res) => {
  (async () => {
    res.send(await contenedor.getRandomProduct());
  })();
});
