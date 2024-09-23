// utils/generarMazo.js
const generarMazo = async (guardarEnMongoDB = false) => {
  let mazo = [];

  const colores = ['rojo', 'verde', 'azul', 'amarillo'];
  const especiales = ['+2', 'reversa', 'salto'];
  const comodines = ['comodin', 'comodin+4'];

  let id = 0; // Inicializa el contador de IDs

  // Cartas numeradas (0-9)
  colores.forEach(color => {
    // Un solo 0 por color
    mazo.push({ id: id++, color, valor: '0', tipo: 'normal', jugable: true });

    // Dos de cada número del 1 al 9
    for (let i = 1; i <= 9; i++) {
      mazo.push({ id: id++, color, valor: i.toString(), tipo: 'normal', jugable: true });
      mazo.push({ id: id++, color, valor: i.toString(), tipo: 'normal', jugable: true });
    }
  });

  // Cartas especiales (+2, reversa, salto) para cada color
  colores.forEach(color => {
    especiales.forEach(especial => {
      mazo.push({ id: id++, color, valor: especial, tipo: 'especial', jugable: true });
      mazo.push({ id: id++, color, valor: especial, tipo: 'especial', jugable: true });
    });
  });

  // Cartas comodín (sin color)
  comodines.forEach(comodin => {
    for (let i = 0; i < 4; i++) {
      mazo.push({ id: id++, color: null, valor: comodin, tipo: 'especial', jugable: true });
    }
  });

  // Guardar el mazo en MongoDB si se indica
  if (guardarEnMongoDB) {
    try {
      await Carta.deleteMany(); // Limpia las cartas existentes
      await Carta.insertMany(mazo); // Inserta el nuevo mazo
      console.log('Mazo guardado en MongoDB correctamente.');
    } catch (error) {
      console.error('Error al guardar el mazo:', error);
    }
  }

  return mazo;
};

module.exports = generarMazo;
