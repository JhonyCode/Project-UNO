const Deck = require('../models/Deck'); // Asegúrate de que la ruta sea correcta

// Define los colores y cartas especiales
const colors = ['red', 'green', 'blue', 'yellow'];
const specialCards = ['+2', 'reverse', 'skip'];
const wildCards = ['wild', 'wild+4'];

const generateDeck = async () => {
  let deck = [];

  // Cartas numeradas (0-9)
  colors.forEach(color => {
    // Un solo '0' por color
    deck.push({ color, value: '0', type: 'normal', playable: true });

    // Dos de cada número del 1 al 9
    for (let i = 1; i <= 9; i++) {
      deck.push({ color, value: i.toString(), type: 'normal', playable: true });
      deck.push({ color, value: i.toString(), type: 'normal', playable: true });
    }
  });

  // Cartas especiales
  colors.forEach(color => {
    specialCards.forEach(special => {
      deck.push({ color, value: special, type: 'special', playable: true });
      deck.push({ color, value: special, type: 'special', playable: true });
    });
  });

  // Cartas comodín
  wildCards.forEach(wild => {
    for (let i = 0; i < 4; i++) {
      deck.push({ color: null, value: wild, type: 'special', playable: true });
    }
  });

  // Guardar el mazo en MongoDB
  try {
    const newDeck = new Deck({ cards: deck }); // Crea un nuevo documento de Deck
    await newDeck.save(); // Guarda el nuevo mazo en MongoDB
    console.log('Deck saved to MongoDB successfully.');
    return newDeck; // Devuelve el mazo guardado
  } catch (error) {
    console.error('Error saving deck:', error);
    return null; // Asegúrate de devolver null o un valor que indique un error
  }
};

module.exports = generateDeck;
