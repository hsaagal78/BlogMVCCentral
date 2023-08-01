const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');


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


}, 
{
  sequelize: db,
  modelName: 'comment',
 
});


module.exports = Comment;