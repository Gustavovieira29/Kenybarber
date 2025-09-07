const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('trabalho_oficial', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
