//Importamos bcrypt para encriptar la contraseña antes de ser guardada en la base de datos
const bcrypt = require("bcrypt");
//Importamos el esquema de validación
const UserModel = require("../models/User");

//POST => Crear usuario (api/users/signup)
const signup = async (req, res) => {
    try {
        //1. Obtenemos los datos del cliente que nos hacen falta
        const { username, email, password } = req.body;
        //2. Encriptamos la contraseña recibida
        const passwordHash = await bcrypt.hash(password, 10);
        //4. Creamos el usuario (Información que tendra nuestra base de datos)
        const newUser = new UserModel({
            username,
            email,
            password: passwordHash,
        });
        //5. Guardamos en la base de datos al nuevo usuario
        const user = await newUser.save();
        //Enviamos respuesta de que todo se ha realizado correctamente
        res.status(201).json({
            status: "ok",
            data: "User create!",
            error: null,
        });
    } catch (error) {
        //Si el error.code es 11000, enviamos un error de usuario duplicado (ya existe en la base de datos)
        if (error.code === 11000) {
            res.status(409).json({
                status: "ko",
                data: null,
                error:
                    "The email is already registered. Please, try with another email.",
            });
        } else {
            //Si es otro error enviamos un mensaje general con error.message
            res.status(400).json({
                status: "ko",
                data: null,
                error: error.message,
            });
        }
    }
};

//GET=> Obtener todos los usuarios (api/users)
const getAllUsers = async (req, res) => {
    try {
        const data = await UserModel.find();
        res.status(200).json({ status: "ok", data, error: null });
        if (!data) {
            return res.status(404).json({ message: 'No existen usuarios' });
        }
    } catch (error) {
        res.status(400).json({
            status: "ko",
            data: null,
            error: error.message,
        });
    }
};

//GET=> Buscar usuario por ID (api/users/:id)

const getUserById = async (req, res) => {
    try {
        // Obtener el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;

        // Buscar el usuario en la base de datos (suponiendo que usas algún ORM como Mongoose)
        const user = await UserModel.findById(userId);

        // Si el usuario no existe, devolvemos un mensaje de error
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si la busqueda es exitosa, devolvemos una respuesta exitosa
        res.status(200).json({ status: "ok", user, error: null });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error buscando el usuario', error: error.message });
    }
};

//PATCH=> Actualizar datos del usuario mediante su ID (api/users/:id)

const updateUser = async (req, res) => {
    try {
        // Obtener el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;

        // Obtener los datos actualizados desde el cuerpo de la petición (enviado desde el formulario del frontend)
        const updatedData = req.body;

        // Actualizar el usuario en la base de datos (usando algún ORM como Mongoose)
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
            new: true, // Devuelve el documento actualizado
            runValidators: true // Ejecuta validaciones según el esquema del modelo
        });

        // Si el usuario no existe, devolvemos un mensaje de error
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si la actualizacion es exitosa, devolvemos una respuesta 200
        res.status(200).json({ status: "ok", updatedUser, error: null });

    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error actualizando el usuario', error: error.message });
    }
};

//DELETE=> Borrar usuario (api/users/:id)

const deleteUser = async (req, res) => {
    try {
        // Obtener el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;

        // Buscar y eliminar el usuario en la base de datos (suponiendo que usas algún ORM como Mongoose)
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        // Si el usuario no existe, devolvemos un mensaje de error
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si la eliminación es exitosa, devolvemos una respuesta exitosa
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error eliminando el usuario', error: error.message });
    }
};

module.exports = { signup, getAllUsers, getUserById, updateUser, deleteUser };