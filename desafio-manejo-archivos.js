const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async #readFile() {
    //? metodo privado para lectura de archivo
    try {
      const data = await fs.promises.readFile(this.nombreArchivo);
      const parsedData = JSON.parse(data);
      return parsedData;
    } catch (e) {
      console.log(e);
    }
  }

  async save(obj) {
    //? Agrega un objeto al archivo con el proximo Id disponible (1 si estaba vacio el archivo)
    const data = await this.#readFile();
    if (data.length !== 0) {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(
          [
            ...data,
            {
              ...obj,
              id: data[data.length - 1].id + 1,
            },
          ],
          null,
          2
        )
      );
    } else {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([{ ...obj, id: 1 }])
      );
    }
  }

  async getById(number) {
    //? Devuelve el array filtrado por id
    const data = await this.#readFile();
    const object = Object.values(data).filter((prod) => prod.id === number);
    return object ? object : null;
  }

  async getAll() {
    //? Devuelve el array completo
    const data = await this.#readFile();
    return data;
  }

  async deleteById(number) {
    //? Guarda el array entero de los objetos con id distinto al parametro.
    const data = await this.#readFile();
    const filteredData = Object.values(data).filter(
      (prod) => prod.id !== number
    );
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(filteredData, null, 2)
    );
    console.log(await this.getAll());
  }

  async deleteAll() {
    //? Inicializa el archivo con un array vacio. Si no existe lo crea
    await fs.promises.writeFile(this.nombreArchivo, "[]");
    console.log("Objectos eliminados");
  }
}

//* --------------------------------------------------------
//* ------------------------ TEST --------------------------
//* --------------------------------------------------------

//* Descomentar para probar metodos

const productos = new Contenedor("./productos.txt");

//* METODO save():
// productos.save({
//   nombre: "Haburguesa",
//   precio: 1220.0,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-512.png",
// });

//* METODO getById():
// (async () => {
//   console.log(await productos.getById(3));
// })();

//* METODO getAll():
// (async () => {
//   console.log(await productos.getAll());
// })();

//* METODO deleteById():
// productos.deleteById(5);

//* METODO deleteAll():
// productos.deleteAll();
