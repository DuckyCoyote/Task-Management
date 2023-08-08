require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  saltRounds: process.env.SALT_ROUNDS || 7,
  USER: process.env.USERDB,
  PASSWORD: process.env.PASSWORDDB,
  HOST: process.env.HOSTDB,
  DATABASE: process.env.DATABASEDB,
  PORT: process.env.PORTDB,
};

module.exports = { config };
