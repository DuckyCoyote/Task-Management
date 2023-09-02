const express = require('express');
const Boom = require('@hapi/boom');
const { models } = require('../../database/sequelize');

const router = express.Router();

const validatorHandler = require('../../middleware/validator.handler');
const { createList, updateList } = require('../../schemas/list.schema');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await models.List.findAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const task = await models.List.findByPk(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createList, 'body'),
  async (req, res, next) => {
    try {
      const task = req.body;
      const taskDb = await models.List.create(task);
      res.json(taskDb);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateList, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const List = req.body;
      const isInDb = await models.List.findByPk(id);
      const ListDb = await isInDb.update(List);
      res.json(ListDb);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const List = await models.List.findByPk(id);
    await List.destroy();
    req.json(200, { message: 'Ok :D' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
