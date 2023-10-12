const express = require('express');
const router = express.Router();

const Pets = require('../../models/pet');
const Owners = require('../../models/owners');

router.get("/pet/:id", (req, res) => {
    let id =  req.params.id;

    if(isNaN(id)) {
        res.status(404).send({ message: 'Id invalido'});
    }
    Pets.findByPk(id).then
        ({
            include: [{model: Owners, attributes: ['name', 'fone']}]
        })
        .then( pet =>{
            if(!pet){
                res.status(404).send({message:'Pet não encontrado'});
            }else{
                res.json(pet)
            }
        }).catch(err =>{
            console.error(err);
            res.status(500).send({message: err.message});
        })
});

// Rota para Visualização do Pet e do seu tutor 
router.get("/pets", (req,res) =>{
    Pets.findAll({//Comando para buscar todos os pets que estão listados no  banco de dados
        include: [{model: Owners, attributes: ['name', 'fone']}]
    })
    .then( pets =>{//Retorno da rota
        res.json(pets);
    });
});

// Rota para atualizar o pet id 
router.put("/pet/update/:id", (req, res) =>{
    let id = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
    let type = req.body.type;
    let race = req.body.race;

    Pets.update({ name : name, age : age, type : type, race : race}, {
        where: {
            id : id
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

//Rota para deletar o pet por id
router.delete("/pet/delete/:id", (req, res) =>{
    let id = req.params.id;
    if(isNaN(id)){
        res.status(400).send({message: "Id invalido!"});
    }else{
        Pets.destroy({
            where: {id: id}
        })
        .then((result) =>{
            if(result === 1){
                res.status(200).send({message: `Sucesso na a exclusão do id: ${id}!`});
            }else{
                res.status(404).send({message: `Registo com id: ${id} não encontrado!`});
            }
        })
        .catch((error) =>{
            console.error(error);
            res.status(500).send({message: "Ocorreu um erro durante a exclusão"});
        });
    }
});

/* erro no codigo 
router.get("/pet/delete/:id", (req, res) =>{
    let id = req.params.id;
    if(id == undefined){
        res.status(400).send({message: "Id invalido"});
    }else{
        if(!isNaN(id)){
            Pets.destroy({
                where: {id: id}
            })
            .then(() =>{
                res.status(200).send({message: `Exclusão do id: ${id} realizada com sucesso!`});
            })
        }
    }
}); */

// rota para cadastro de um novo pet
router.post("/pet/save", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let type = req.body.type;
    let race = req.body.race;
    let ownerId = req.body.ownerId;

    Pets.findOne({
        where:{id:id}
    })
    .then(existingPets => {
        if (existingPets == null){
            if(name !== undefined && name.trim() !== ""){ 
                const newPet = Pets.build({
                    id: id,
                    name: name,
                    age: age,
                    type: type,
                    race: race,
                    ownerId: ownerId 
                });
            newPet.save()
            .then(() => {
                res.status(200).send("Salvo com sucesso!");
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Error: " + err.message);
            });
            }
        }else{
        res.status(400).send("Pet já cadastrado!");
        }
    })
});

module.exports = router;