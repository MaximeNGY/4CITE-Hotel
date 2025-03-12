const request = require('supertest');
const app = require('../server'); // Importer l'instance d'Express
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
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