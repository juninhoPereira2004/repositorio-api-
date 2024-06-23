/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('idosos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('idade').unsigned().notNullable();
        table.string('endereco');
        table.string('cidade');
        table.string('telefone');
        table.timestamps(true, true);
      });
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('idosos');
};
