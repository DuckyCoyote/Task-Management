const Joi = require('joi');

const description = Joi.string();
const idList = Joi.number().integer();
const status = Joi.boolean();
const idUser = Joi.number().integer();

const createTask = Joi.object({
  description: description.required(),
  idList: idList.required(),
  idUser
});

const updateTask = Joi.object({  
  description,
  status,
  idList,
});

module.exports = {createTask, updateTask};
