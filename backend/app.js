const express = require('express');
const generarMazo = require('./utils/generarMazo');
const app = express();
const PORT = 3000;

app.get('/generar-mazo', async (req, res) => {
  try {
    const mazo = await generarMazo(false); // Genera el mazo sin guardarlo en la base de datos , si le ponemos true, lo guardará en base de datos
    res.json(mazo); 
  } catch (error) {
    console.error('Error al generar el mazo:', error);
    res.status(500).json({ error: 'Error al generar el mazo' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
