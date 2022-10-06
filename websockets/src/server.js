const express = require("express");
const app = express();
const port = 8080;
const hbs = require("express-handlebars");
const {Server: IOServer} = require("socket.io");
const {Server: HttpServer} = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const Contenedor = require("./manejo-archivos")
const {response} = require("express");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("../public"));

const contenedor = new Contenedor("./messages.txt")
const products = [
    {
        title: "Mostaza",
        price: 124.35,
        thumbnail:
            "https://cdn4.iconfinder.com/data/icons/allergenic-food/64/15-Mustard-1024.png",
    },
    {
        title: "Lata gaseosa",
        price: 125.99,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/food-3-11/128/food_Soda-Pepsi-Cola-Coke-Beverage-512.png",
    },
    {
        title: "Panchito",
        price: 320,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/food-and-drink-color/64/hotdog_fastfood_food_restaurant_sausage_bread_breakfast-512.png",
    },
    {
        title: "Haburguesa",
        price: 1220,
        thumbnail:
            "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-512.png",
    },
]
let messages = []
contenedor.getAll().then((response) => messages = response)

app.get('/', (req, res) => {
    res.render('index')
})

//* WEBSOCKET
io.on("connection", (socket) => {
    console.log("se conecto alguien");
    socket.emit('products', products)
    socket.emit('messages', messages)
    socket.on("newProduct", (data) => {
        products.push(data)
        io.sockets.emit('products', products)
    })
    socket.on("newMessage", (data) => {
        contenedor.save(data) //Persisto en archivo
        messages.push(data);
        io.sockets.emit('messages', messages)
    });
});


//* SETUP MOTOR PLANTILLAS (HANDLEBARS)
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
const server = httpServer.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));