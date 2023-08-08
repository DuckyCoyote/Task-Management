const Joi = require('joi');

const name = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUser = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required()
});

const updateUser = Joi.object({  
  name,
  lastName,
  email,
  password,
});

module.exports = {createUser, updateUser};
