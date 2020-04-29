var Sequelize = require('sequelize');
module.exports =  new Sequelize('bi', 'root', 'password', {
  host: 'localhost',
  dialect:'mysql',
});