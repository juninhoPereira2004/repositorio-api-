/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('vacinas', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('descricao');
        table.integer('idade_recomendada').unsigned().notNullable();
        table.boolean('obrigatoria').defaultTo(false);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('vacinas');
};
