const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');
const Thought = require('./Thought');


class Comment extends Model { }


Comment.init({

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
  thoughtId: {
    type: DataTypes.INTEGER,
    references: {
      model: Thought,
      key: 'id',
    },

  },
  

}, 
{
  sequelize: db,
  modelName: 'comment',
 
});


module.exports = Comment;