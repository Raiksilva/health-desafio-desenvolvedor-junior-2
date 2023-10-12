const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('./models/database.js');
const Pet = require('./models/pet.js');
const Owners = require('./models/owners');

const ownersController = require('./controller/owners/ownersController.js');
const petsController = require('./controller/pet/petController.js');

app.use(express.json());
app.use("/", ownersController);
app.use("/", petsController);



app.listen(3000, function(erro) {
    if(erro){
        console.log(`error ao iniciar o servidor: ${erro}`);
    }else{
        console.log("Servidor iniciado com sucesso...");
    }

});