const USER = process.env.USERDB || 'root';
const PASSWORD = process.env.PASSWORDDB || '1234';
const HOST = process.env.HOSTDB || 'localhost';
const DATABASE = process.env.DATABASEDB || 'todo_list';
const PORT = process.env.PORTDB || '3306';

const URI = `mariadb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mariadb'
  }
}
