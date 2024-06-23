/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('agenda', table => {
        table.increments('id').primary();
        table.integer('idoso_id').unsigned().notNullable().references('id').inTable('idosos').onDelete('CASCADE');
        table.integer('agente_saude_id').unsigned().notNullable().references('id').inTable('agenteSaude').onDelete('CASCADE');
        table.integer('vacina_id').unsigned().notNullable().references('id').inTable('vacinas').onDelete('CASCADE');
        table.dateTime('data_agendada').notNullable();
        table.boolean('realizada').defaultTo(false);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('agenda');
};
