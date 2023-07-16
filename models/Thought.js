const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');


class Thought extends Model { }


Thought.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
    },
  },

}, 
{
  sequelize: db,
  modelName: 'thought'
});


module.exports = Thought;

