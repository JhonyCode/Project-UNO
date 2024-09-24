const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Conexión a la base de datos

dotenv.config(); // Cargar las variables de entorno
connectDB(); // Conectar a MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para poder recibir JSON en las solicitudes

// Importar las rutas desde index.js
const apiRoutes = require('./Routes/Index'); // Ajusta la ruta si es necesario
app.use('/api', apiRoutes); // Usar las rutas API

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor running on http://localhost:${PORT}`);
});
