const Sequelize = require('sequelize');

const sequelize = new Sequelize('hackathon7', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
});

const Cadastro = sequelize.define('cadastro', {
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    telefone: Sequelize.STRING,
    endereco: Sequelize.STRING,
});

const Vacinacao = sequelize.define('vacinacao', {
    idosoId: Sequelize.INTEGER,
    tipoVacina: Sequelize.STRING,
    dataVacina: Sequelize.DATE,
});

Cadastro.hasMany(Vacinacao, { foreignKey: 'idosoId' });
Vacinacao.belongsTo(Cadastro, { foreignKey: 'idosoId' });

sequelize.sync();

module.exports = {
    sequelize,
    Cadastro,
    Vacinacao,
};
