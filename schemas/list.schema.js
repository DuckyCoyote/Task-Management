const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createList = Joi.object({
  name: name.required(),
});

const updateList = Joi.object({  
  id: id.required(),
  name,
});

module.exports = {createList, updateList};
