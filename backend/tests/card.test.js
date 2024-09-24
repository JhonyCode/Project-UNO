// tests/card.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Card = require('../models/Card'); // Import the Card model

let mongoServer;

beforeAll(async () => {
  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect mongoose to the in-memory MongoDB
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Close the mongoose connection and stop the server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Card Model Test', () => {
  // Clear the database between tests
  afterEach(async () => {
    await Card.deleteMany({});
  });

  it('should create and save a card successfully', async () => {
    const validCard = new Card({
      id: 1,
      color: 'rojo',
      valor: '5',
      tipo: 'normal',
      jugable: true
    });

    const savedCard = await validCard.save();

    // Check if the saved card exists and is valid
    expect(savedCard._id).toBeDefined(); // Mongoose generates an _id automatically
    expect(savedCard.id).toBe(1);
    expect(savedCard.color).toBe('rojo');
    expect(savedCard.valor).toBe('5');
    expect(savedCard.tipo).toBe('normal');
    expect(savedCard.jugable).toBe(true);
  });

  it('should fail to create a card without required fields', async () => {
    const invalidCard = new Card({
      color: 'rojo'
    });

    let err;
    try {
      await invalidCard.save();
    } catch (error) {
      err = error;
    }

    // Ensure the error was thrown due to validation
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.valor).toBeDefined(); // 'valor' is required
    expect(err.errors.tipo).toBeDefined();  // 'tipo' is required
  });

  it('should fail if an invalid "color" is provided', async () => {
    const invalidCard = new Card({
      id: 2,
      color: 'morado', // Invalid color
      valor: '5',
      tipo: 'normal',
      jugable: true
    });

    let err;
    try {
      await invalidCard.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.color).toBeDefined(); // 'color' must be one of the allowed values
  });
});
