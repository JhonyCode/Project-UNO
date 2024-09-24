//Importamos express
const express = require('express');
//Importamos express para poder usar router para generar las rutas
const router = express.Router();
//Importamos apiController para generar rutas a los endpoints
const userController = require("../Controller/userController");

router.post("/create/create-user", userController.postCreateUser);


module.exports = router;