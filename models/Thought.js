const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');
const Comment = require('./Comment');



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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },


}, 
{
  sequelize: db,
  modelName: 'thought',
 
});

Thought.hasMany(Comment);
Comment.belongsTo(Thought);

module.exports = Thought;

