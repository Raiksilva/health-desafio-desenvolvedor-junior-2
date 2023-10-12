const sequelize = require('sequelize')
const connection = new sequelize('PetShop', 'postgres', '162534',{
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    timezone:  '-03:00'
});

module.exports = connection;