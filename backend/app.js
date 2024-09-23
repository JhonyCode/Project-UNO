const express = require('express');
const generarMazo = require('./utils/generarMazo'); // Asegúrate de importar la función generarMazo correctamente
const app = express();
const PORT = 3000;

// Ruta para generar el mazo y devolverlo como JSON
app.get('/', async (req, res) => {
  try {
    const mazo = await generarMazo(false); 
    res.json(mazo); 
  } catch (error) {
    console.error('Error al generar el mazo:', error);
    res.status(500).json({ error: 'Error al generar el mazo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
