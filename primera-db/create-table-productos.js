const { optionsMariaDB } = require("./db-options");
const knex = require("knex")(optionsMariaDB);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id");
    table.string("title");
    table.float("price");
    table.string("url");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => knex.destroy());
