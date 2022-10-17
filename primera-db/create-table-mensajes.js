const { optionsSqlite } = require("./db-options");
const knex = require("knex")(optionsSqlite);

knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id");
    table.string("username");
    table.string("message");
    table.dateTime("timestamp");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => knex.destroy());
