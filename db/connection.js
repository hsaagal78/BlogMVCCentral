const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('user_app_blogPosts', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = sequelize;