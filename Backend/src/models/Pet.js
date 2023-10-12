const Sequelize = require('sequelize');
const connection = require('./database');
const Owners = require('./owners');

const Pet = connection.define('Pet', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Informe o identificador do animal."
            }
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Precisa ser preenchido o nome do animal."
            }
        }
    },
    age: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A idade precisa ser informada."
            }
        }
    },
    type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Precisa ser informado o tipo do animal."
            }
        }
    },
    race: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A raça precisa ser informada."
            }
        }
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Owners,
            key: 'ownerId',
        },
    },
});

Pet.belongsTo(Owners, { foreignKey: 'ownerId' });
Owners.hasMany(Pet, { foreignKey: 'ownerId' });


Pet.sync({force: false})
    .then(() =>{
    })
    .catch(err => console.log(err));

module.exports = Pet;