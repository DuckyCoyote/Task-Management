const { DataTypes, Model, Sequelize } = require('sequelize');
const { LIST_TABLE } = require('./list.model');
const { USER_TABLE } = require('./user.model');

const TASK_TABLE = 'task';

const TaskSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true 
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,    
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  idList: {
    field: 'id_list',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: LIST_TABLE,
      key: 'id'
    },
  },
  idUser: {
    field: 'id_user',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
  }
}

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.List, {foreignKey: 'idList', as: 'Task'})
    this.belongsTo(models.User, {foreignKey: 'idUser', as: 'User'})
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: false
    }
  }
}

module.exports = { TASK_TABLE, TaskSchema, Task };