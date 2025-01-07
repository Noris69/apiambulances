const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// Étendre le délai d'attente de Jest pour éviter les erreurs de timeout
jest.setTimeout(30000);

beforeAll(async () => {
  const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/testDB';
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB on localhost');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
  }
});

describe('Ambulance API', () => {
  it('should fetch all ambulances', async () => {
    const res = await request(app).get('/ambulances');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new ambulance', async () => {
    const newAmbulance = {
      id: 1,
      marque: 'Toyota',
      modele: 'Hiace',
      couleur: 'White',
    };
    const res = await request(app).post('/ambulances').send(newAmbulance);
    expect(res.statusCode).toBe(201);
    expect(res.body.marque).toBe('Toyota');
  });

  it('should fetch a specific ambulance by ID', async () => {
    const res = await request(app).get('/ambulances/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('should update an ambulance by ID', async () => {
    const updatedData = {
      marque: 'Ford',
      modele: 'Transit',
      couleur: 'Blue',
    };
    const res = await request(app).put('/ambulances/1').send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body.marque).toBe('Ford');
  });

  it('should delete an ambulance by ID', async () => {
    const res = await request(app).delete('/ambulances/1');
    expect(res.statusCode).toBe(200);
  });
});
