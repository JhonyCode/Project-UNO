const Deck = require('../models/Deck'); 

const colors = ['red', 'green', 'blue', 'yellow'];
const specialCards = ['+2', 'reverse', 'skip'];
const wildCards = ['wild', 'wild+4'];

const generateDeck = async (saveToMongoDB = false) => {
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

  // Cartas especiales (+2, reversa, salto) para cada color
  colors.forEach(color => {
    specialCards.forEach(special => {
      deck.push({ color, value: special, type: 'special', playable: true });
      deck.push({ color, value: special, type: 'special', playable: true });
    });
  });

  // Cartas comodín (sin color)
  wildCards.forEach(wild => {
    for (let i = 0; i < 4; i++) {
      deck.push({ color: null, value: wild, type: 'special', playable: true });
    }
  });

  // Guardar el mazo en MongoDB si se indica
  if (saveToMongoDB) {
    try {
      const newDeck = new Deck({ cards: deck }); // Crea un nuevo documento de Deck
      await newDeck.save(); // Guarda el nuevo mazo en MongoDB
      console.log('Deck saved to MongoDB successfully.');
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  }

  return deck;
};

module.exports = generateDeck;
