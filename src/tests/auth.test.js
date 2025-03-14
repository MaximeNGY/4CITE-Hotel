const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

beforeAll(async () => {
    const connectToDatabase = async () => {
        // Vérifier si une connexion existe déjà
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        }
      };
    await User.deleteMany(); // Nettoyer la BDD avant chaque test
});

afterAll(async () => {
    await mongoose.disconnect();
});

test("Inscription d'un utilisateur", async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: "test@email.com", pseudo: "testUser", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
});

test("Connexion avec un compte existant", async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: "test@email.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
});