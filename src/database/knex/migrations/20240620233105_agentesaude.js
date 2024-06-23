/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('agenteSaude', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('telefone');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('agenteSaude');
};
