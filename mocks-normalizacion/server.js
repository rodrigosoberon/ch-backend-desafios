import express from "express";
const app = express();
const port = 8080;
import hbs from "express-handlebars";
import {createServer} from "http";
import {Server} from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer);
import ContenedorArchivo from "./modules/ContenedorArchivo.js";
import path from "path";
import {faker} from '@faker-js/faker'
faker.locale = 'es'
import {normalizarMensajes} from "./modules/normalizr.js";


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("index");
});


//Productos fake
let arrayProductos = [];
for (let i = 0; i < 5; i++) {
    arrayProductos.push({
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        image: faker.image.fashion(30, 30, true)
    })
}

app.get("/api/productos-test", (req, res) => {
    res.render("productos-test", {productos: arrayProductos});
})


// CONTENEDOR PARA ACCESO A DB's
const contenedorMensajes = new ContenedorArchivo("./mensajes.json")

// WEBSOCKET
io.on("connection",  (socket) => {
    console.log("se conecto alguien");
    contenedorMensajes.listarAll().then((response) => {
        // console.log(response)
        socket.emit("messages", normalizarMensajes(response));
    });

    socket.on("newMessage", (data) => {
        contenedorMensajes.guardar(data).then(() => {
            contenedorMensajes.listarAll().then((response) => {
                io.sockets.emit("messages", normalizarMensajes(response));
            });
        });
    });
});


// SETUP MOTOR PLANTILLAS (HANDLEBARS)
app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        partialDir: path.dirname("./views/partials"),
        layoutDir: path.dirname("./views/layouts"),
        defaultLayout: "layout.hbs",
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");

// SETUP DEL SERVER

const server = httpServer.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
