const express = require("express");
const { Router } = express;
const router = Router();

const productos = [
    {
      title: "Mostaza",
      price: 124.35,
      thumbnail:
        "https://cdn4.iconfinder.com/data/icons/allergenic-food/64/15-Mustard-1024.png",
      id: 1,
    },
    {
      title: "Lata gaseosa",
      price: 125.99,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/food-3-11/128/food_Soda-Pepsi-Cola-Coke-Beverage-512.png",
      id: 2,
    },
    {
      title: "Panchito",
      price: 320,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/food-and-drink-color/64/hotdog_fastfood_food_restaurant_sausage_bread_breakfast-512.png",
      id: 3,
    },
    {
      title: "Haburguesa",
      price: 1220,
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-512.png",
      id: 4,
    },
];

router.get("/", (req, res) => {
  res.render("productos", { productos });
});

router.get("/:id", (req, res) => {
  const productoEncontrado = productos.filter(
    (producto) => producto.id == req.params.id
  );
  productoEncontrado.length
    ? res.send(productoEncontrado)
    : res.status(400).json({ error: "producto no encontrado" });
});

router.put("/:id", (req, res) => {
  const posicionProducto = productos.findIndex((p) => p.id == req.params.id);
  //? findIndex devuelve -1 cuando no hay coincidencia
  if (posicionProducto === -1) {
    res.status(400).json({ error: "producto no encontrado" });
  } else {
    productos[posicionProducto] = { ...req.body, id: req.params.id };
    res.status(200).json(productos);
  }
});

router.post("/", (req, res) => {
  //Calculo de proximo Id a asignar
  let proxId;
  productos.length
    ? (proxId = productos[productos.length - 1].id + 1)
    : (proxId = 1);
  const nuevoProducto = { ...req.body, id: proxId };
  productos.push(nuevoProducto);
  res.status(201).redirect("/");
});

router.delete("/:id", (req, res) => {
  const posicionProducto = productos.findIndex((p) => p.id == req.params.id);
  //? findIndex devuelve -1 cuando no hay coincidencia
  if (posicionProducto === -1) {
    res.status(400).json({ error: "producto no encontrado" });
  } else {
    productos.splice(posicionProducto, 1);
    res.status(200).json(productos);
  }
});

module.exports = router;
