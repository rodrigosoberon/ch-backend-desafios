import { promises } from "fs";
import { type } from "os";

export class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async #readFile() {
    //? metodo privado para lectura de archivo
    try {
      const data = await promises.readFile(this.nombreArchivo);
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
      await promises.writeFile(
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
      await promises.writeFile(
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
    await promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(filteredData, null, 2)
    );
    console.log(await this.getAll());
  }

  async deleteAll() {
    //? Inicializa el archivo con un array vacio. Si no existe lo crea
    await promises.writeFile(this.nombreArchivo, "[]");
    console.log("Objectos eliminados");
  }

  async getRandomProduct() {
    //? Devuelve un array con un producto cualquiera del archivo
    const data = await this.#readFile();
    const products = Object.values(data);
    const productQuantity = products.length;
    const randomProductId = Math.floor(Math.random() * productQuantity);
    const randomProduct = products[randomProductId];
    return randomProduct;
  }
}