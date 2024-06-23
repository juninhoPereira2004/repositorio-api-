const { Model } = require('objection');
const knex = require('./../bancoDeDados/conexao'); 

Model.knex(knex);

class Vacina extends Model {
  static get tableName() {
    return 'vacinas';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['nome', 'descricao', 'idade_recomendada', 'obrigatoria'],

      properties: {
        id: { type: 'integer' },
        nome: { type: 'string', minLength: 1, maxLength: 255 },
        descricao: { type: 'string', minLength: 1, maxLength: 255 },
        idade_recomendada: { type: 'integer' },
        obrigatoria: { type: 'boolean' }
      }
    };
  }
}

module.exports = Vacina;
