import express from 'express'
import session from 'express-session'
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo";
import hbs from 'express-handlebars';
import path from 'path';
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import config from "./config.js";
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

// ----------------------------------------------------------------------------------
// CONFIGURACION SERVIDOR

const app = express();
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// ----------------------------------------------------------------------------------
// MANEJO DE SESSION

// app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoRemote.cnxStr,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

// ----------------------------------------------------------------------------------
// RUTAS

app.use(authWebRouter)
app.use(homeWebRouter)

// ----------------------------------------------------------------------------------
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


// ----------------------------------------------------------------------------------
// INICIO DEL SERVER

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));