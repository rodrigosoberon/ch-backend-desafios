const express = require("express");
const app = express();
const port = 8080;
const productos = require("../../modules/productos");
const hbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../../public"));
app.use("/productos", productos);

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    partialDir: __dirname + "/views/partials",
    layoutDir: __dirname + "/views/layouts",
    defaultLayout: "layout.hbs",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

//* SETUP DEL SERVER
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
