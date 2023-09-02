const { User, UserSchema } = require('./user.model');
const { Task, TaskSchema } = require('./task.model');
const { List, ListSchema } = require('./list.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  List.init(ListSchema, List.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
  
  User.associate(sequelize.models);
  List.associate(sequelize.models);
  Task.associate(sequelize.models);
}

module.exports = {setupModels} ;
