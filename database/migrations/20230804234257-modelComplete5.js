'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
const { TaskSchema, TASK_TABLE } = require('../models/task.model');
const { ListSchema, LIST_TABLE } = require('../models/list.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(LIST_TABLE, ListSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(LIST_TABLE);
    await queryInterface.dropTable(TASK_TABLE);
  },
};
