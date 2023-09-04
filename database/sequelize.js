const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const { setupModels } = require('./models');

const USER = config.USER;
const PASSWORD = config.PASSWORD;
const HOST = config.HOST;
const DATABASE = config.DATABASE;
const PORT = config.PORT;

const URI = `mariadb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const sequelize = new Sequelize(URI, {
  logging: (msg) => console.log(msg),
});

setupModels(sequelize);

module.exports = sequelize;
