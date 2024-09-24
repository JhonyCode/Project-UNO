const express = require('express');
const generateDeck = require('./utils/generateDeck');
const app = express();
const PORT = 3000;
const connectDB = require('./config/db');  // Importa la conexión a la base de datos
require('dotenv').config();  // Cargar las variables de entorno

connectDB();
// Ruta para generar el mazo y devolverlo como JSON
app.get('/generate-deck', async (req, res) => {
  try {
    // Genera el mazo sin guardarlo en la base de datos. Si le pones 'true', lo guardará en la base de datos.
    const mazo = await generateDeck(true); 
    res.json(mazo); 
  } catch (error) {
    console.error('Error while generating deck:', error);
    res.status(500).json({ error: 'Error while generating deck' });
  }
});


// Ruta básica para probar el servidor
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor running on http://localhost:${PORT}`);
});
