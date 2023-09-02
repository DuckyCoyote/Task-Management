const express = require('express');
const Boom = require('@hapi/boom');
const { models } = require('../../database/sequelize');

const router = express.Router();

const validatorHandler = require('../../middleware/validator.handler');
const { createTask, updateTask } = require('../../schemas/task.schema');

router.get('/', async (req, res, next) => {
  try {
    const id = req.session.idUser;
    const user = await models.User.findByPk(id, { attributes: ['image'] });
    const tasks = await models.Task.findAll({
      where: { idUser: id },
      order: [['id', 'DESC']],
    });
    res.render('tasks', { tasks, user });
  } catch (error) {
    next(error);
  }
});

router.get('/:filter', async (req, res, next) => {
  try {
    const validSubRoutes = [
      'completed',
      'pendient',
      'personal',
      'work',
      'services',
    ];
    const filter = req.params.filter;
    const id = req.session.idUser;
    const user = await models.User.findByPk(id, { attributes: ['image'] });

    let param;
    if (filter === 'completed') param = { status: 1 };
    else if (filter === 'pendient') param = { status: 0 };
    else if (filter === 'personal') param = { idList: 1 };
    else if (filter === 'work') param = { idList: 2 };
    else if (filter === 'services') param = { idList: 3 };

    if (validSubRoutes.includes(filter)) {
      const tasks = await models.Task.findAll({
        where: { idUser: id, ...param },
        order: [['id', 'DESC']],
      });
      res.render('tasks', { tasks, page: filter, user });
    } else {
      res.status(400).redirect('/task');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await models.Task.findByPk(id);
    res.json(200, task);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/add-task',
  validatorHandler(createTask, 'body'),
  async (req, res, next) => {
    try {
      const idUser = req.session.idUser;
      const taskBody = req.body;
      const idList = parseInt(taskBody.idList);
      const task = await { ...taskBody, idUser, idList };
      await models.Task.create(task);
      res.redirect('/task');
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updateTask, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = req.body;
      const taskDb = await models.Task.findByPk(id);
      const taskUpdated = await taskDb.update(task);
      res.json(taskUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
