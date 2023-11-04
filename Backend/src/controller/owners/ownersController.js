const express = require('express');
const router = express.Router();
const connection = require('../../models/database')

const Owners = require('../../models/owners');
const Pet = require('../../models/pet');

router.get('/owner/:ownerId', (req, res) => {
    let ownerId = req.params.ownerId

    if(isNaN(ownerId)) {
        res.status(404).send({ message: 'Id invalido.'})
    }
    Owners.findByPk(ownerId, {
        include: [
            { 
                model: Pet, attributes: ['id', 'name', ]
            }
        ], attributes: ['ownerId', 'name', 'fone']
    })
    .then( owners =>{
        if(!owners){
            res.status(404).send({message: 'Tutor não encontardo.'});
        }else{
            res.json(owners);
        }
    })
    .catch(err =>{
        console.error(err);
        res.status(500).send({message: err.message});
    });
});



/* ,Rotar que vai puxar uma lista de todos os tutores que estão cadastrados  */
router.get('/owners',(req, res) => {
    Owners.findAll({
        include: [
            {
                model: Pet, 
                attributes: ['id', 'name']
            }
        ], // incluido a tabela Pet associada a tabela Owners pelo link de tutor animal
        attributes: ['ownerId', 'name', 'fone']
    })
    .then( Owners =>{
        res.status(200).json(Owners);
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({error: "Erro ao buscar proprietários e seus pets."});
    })
});

// Rota para atualizar o owner id 
router.put("/owner/update/:id", (req, res) =>{
    let ownerId = req.params.id;
    let name = req.body.name;
    let fone = req.body.fone;

    Owners.update({ name : name, fone: fone}, {
        where: {
            ownerId : ownerId
        },
    })
    .then(() =>{
        res.status(200).send('Alteração realizada com sucesso!');
    })
    .catch(err =>{ 
        console.error(err);
        res.status(500).send({message: err.message})
    });
});


router.put('/owners/edit/:ownerId', (req, res) =>{
    let ownerId = req.params.ownerId;
    let name = req.query.body.name;
    let fone = req.query.body.fone;

    Owners.uptade({ name: name, fone: fone}, {
        where: { ownerId: ownerId}
    })
    .then(() =>{
        res.status(200).json({success: "Atualização realizada com sucesso!"});
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({error: "Erro ao tentar atualizar o dados do tutor"});
    });
})

/* router.delete('/owner/delete/:ownerId',(req, res) => {
    let ownerId = req.params.ownerId;
   
    if(isNaN(ownerId)){
        res.status(400).send({ message: "Id invalido!"});
    }else{
        
        Owners.destroy({
            where: {ownerId: ownerId}
        })
        .then((result) =>{
            if(result === 1){
                res.status(200).send({ message: `Exclusão do id: ${ownerId} realizado com sucesso! `});
            }else{
                res.status(404).send({ message: `Registro do id: ${ownerId} não encontrado!`});
            }
        }).catch((error) =>{
            console.error(error);
            res.status(500).send({message: "Ocorreu um erro durante a exclusão"});
        });
    }
}); */

router.delete('/owner/delete/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;

    if (isNaN(ownerId)) {
        res.status(400).send({ message: "Id inválido!" });
        return;
    }

    try {
        // Iniciar uma transação
        await connection.transaction(async (t) => {
            const petsCount = await Pet.count({ where: { ownerId: ownerId } });
            if (petsCount > 0) {
                res.status(400).send({ message: "Não é possível excluir o dono, pois ele está ligado a pets." });
            } else {
                Owners.destroy({
                    where: {ownerId: ownerId}
                })
                .then((result) =>{
                    if(result === 1){
                        res.status(200).send({ message: `Exclusão do id: ${ownerId} realizado com sucesso! `});
                    }else{
                        res.status(404).send({ message: `Registro do id: ${ownerId} não encontrado!`});
                    }
                })
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ocorreu um erro durante a exclusão" });
    }
});



/* Rota para salvar o tutor do animal que estarar no petshop */
router.post("/owner/save",(req, res) => {
    let ownerId = req.body.ownerId;
    let name = req.body.name;
    let fone = req.body.fone;

    Owners.findOne({
        where:{ownerId: ownerId}
    })
    .then(existingOwners => {
        if(existingOwners == null){/* Verifica se o nome não é undefined e não é uma string vazia após remover espaços em branco. */
            if(fone !== undefined && fone.trim() !== "") { /* Verifica se a senha não é undefined e não é uma string vazia após remover espaços em branco. */
                // Crie uma instância de Owners para criar um novo registro
                const newOwner = Owners.build({
                    ownerId: ownerId,
                    name: name,
                    fone: fone
                });
                newOwner.save()
                .then( () => {
                    console.log("Salvo com sucesso!");
                    res.status(200).send("Salvo com sucesso!");
                    
                })
                .catch( (err) => {
                    console.error(err.message);
                    res.status(500).send(err.message);
                });
            }
        }else{
            console.log("usuario já esta cadastrado!");
            res.status(400).send("Usuario já esta cadastrado!");
        }
    })
});

module.exports = router;