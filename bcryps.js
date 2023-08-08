const Bcrypt = require('bcrypt');
const { config } = require('./config/config');
const saltRounds = parseInt(config.saltRounds);

const password = 'HolaMundo';
const newPassword = '_alejo123@cons.21p02';

async function hashPassword (salt, password) {
  const hash = await Bcrypt.hash(password, saltRounds);
  const comparePasssword = await Bcrypt.compare(password, hash);

  console.log(comparePasssword)
}

hashPassword(saltRounds, password);

// console.log('Hashing password: ', hash);

// console.log('Is same?: ', comparePasssword)

