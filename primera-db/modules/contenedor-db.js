class Contenedor {
  constructor(nombreTabla, options) {
    this.nombreTabla = nombreTabla;
    this.knex = require("knex")(options);
  }

  async getAll() {
    //? Devuelve la tabla completa
    let data = [];
    try {
      data = this.knex.from(this.nombreTabla).select("*");
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  async save(obj) {
    //? Guarda un objeto en la base de datos
    this.knex(this.nombreTabla)
      .insert(obj)
      .then(() => console.log("data inserted"));
  }
}

module.exports = Contenedor;
