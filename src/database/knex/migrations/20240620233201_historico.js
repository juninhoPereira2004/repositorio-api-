/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('historico', table => {
        table.increments('id').primary();
        table.integer('idoso_id').unsigned().notNullable().references('id').inTable('idosos').onDelete('CASCADE');
        table.integer('vacina_id').unsigned().notNullable().references('id').inTable('vacinas').onDelete('CASCADE');
        table.dateTime('data_aplicacao').notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('historico');
};
