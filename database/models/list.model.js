const { DataTypes, Model, Sequelize } = require('sequelize');

const LIST_TABLE = 'list';

const ListSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

class List extends Model {
  static associate(models) {
    this.hasMany(models.Task, { as: 'Tasks', foreignKey: 'idList' });    
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: LIST_TABLE,
      modelName: 'List',
      timestamps: false,
    }
  }
}

module.exports = {ListSchema, LIST_TABLE, List};