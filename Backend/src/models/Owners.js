const Sequelize = require('sequelize');
const connection = require('./database');

/* motagem da tabela e colunas para o tutor do animal  */
const Owners = connection.define('owners',{
    ownerId: { type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "Informe o nome do tutor do animal."
            }
        }
    },
    name: { type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "Informe o nome do tutor do animal."
            }
        } 
    },
    fone: { type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Informe o número de telefone do tutor."
            }
        }
    }
});

Owners.beforeDestroy(async (owner, options) => {
    const petsCount = await Pet.count({ where: { ownerId: owner.ownerId } });
    if (petsCount > 0) {
        throw new Error("Não é possível excluir o dono, pois ele está ligado a pets.");
    }
});




Owners.sync({force: false})
    .then(() =>{

    })
    .catch(err => console.log(err));

module.exports = Owners;

