//Importamos express
const express = require('express');
//Importamos express para poder usar router para generar las rutas
const router = express.Router();
//Importamos apiController para generar rutas a los endpoints
const userController = require("../controllers/userController");

// Crear un nuevo usuario (Signup)
router.post('/signup', userController.signup);

// Obtener todos los usuarios
router.get('/users', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar un usuario por ID
router.patch('/:id', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;