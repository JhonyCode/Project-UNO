const express = require('express');
const generarMazo = require('./utils/generarMazo');
const app = express();
const PORT = 3000;

// Ruta para generar el mazo y devolverlo como JSON
app.get('/generar-mazo', async (req, res) => {
  try {
    // Genera el mazo sin guardarlo en la base de datos. Si le pones 'true', lo guardará en la base de datos.
    const mazo = await generarMazo(false); 
    res.json(mazo); 
  } catch (error) {
    console.error('Error al generar el mazo:', error);
    res.status(500).json({ error: 'Error al generar el mazo' });
  }
});

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
