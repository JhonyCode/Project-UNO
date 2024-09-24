const Game = require('../models/Game');
const Deck = require('../models/Deck');
const User = require('../models/User');
const generateDeck = require('../utils/generateDeck'); 

// Función para mezclar el mazo de cartas
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Intercambiar
  }
  return deck;
};

const postGames = async (req, res) => {
  try {
    const { players } = req.body; 

    // Busca un mazo que no esté en uso
    let deckData = await Deck.findOne({ inUse: false });

    if (!deckData) {
      console.log("No hay mazo disponible, generando uno nuevo...");
      // Si no hay mazo disponible, crea uno nuevo
      deckData = await generateDeck(); // Espera a que se genere el mazo
      deckData.inUse = true;
      await deckData.save();

      // Verifica que el mazo se generó correctamente
      if (!deckData || !deckData.cards || deckData.cards.length === 0) {
        return res.status(500).json({ error: "El mazo no se generó correctamente." });
      }
    } else {
      // Si se encontró un mazo, establece su estado como en uso
      deckData.inUse = true; // Cambia el estado a en uso
      await deckData.save(); // Guarda el cambio
    }

    // Mezcla el mazo
    const shuffledDeck = shuffleDeck(deckData.cards.slice()); 

    // Asigna cartas a los jugadores
    const assignedCards = players.map(playerId => {
      const cards = shuffledDeck.splice(0, 7); // Toma 7 cartas
      return { player: playerId, cards };
    });

    // Actualiza las cartas en el mazo, marcándolas como no jugables
    const cardsToUpdate = assignedCards.flatMap(({ cards }) => cards);
    for (const card of cardsToUpdate) {
      const index = deckData.cards.findIndex(c => c.color === card.color && c.value === card.value);
      if (index !== -1) {
        deckData.cards[index].playable = false; // Cambia el estado de la carta a no jugable
      }
    }

    // Guarda el mazo actualizado
    await Deck.updateOne({ _id: deckData._id }, { cards: deckData.cards });

    // Crea el juego
    const newGame = new Game({
      players,
      deck: deckData._id, 
      playedCards: [],
      currentPlayer: players[0], // El primer jugador es el que comienza
      status: 'in progress',
      assignedCards, // Asigna las cartas a los jugadores
    });

    await newGame.save();
    res.status(201).json(newGame); // Responde con el juego creado
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Error creating game' });
  }
};

module.exports = { postGames };
