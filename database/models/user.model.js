const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  lastName: {
    field: 'last_name',
    type: DataTypes.STRING,
    allowNull: false,    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'default.jpg'
  }
};

class User extends Model {
  static associate(models) { 
    this.hasMany(models.Task, {as: 'Tasks', foreignKey: 'idUser'})
  }
  
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    }
  }
}

module.exports = {User, UserSchema, USER_TABLE};
