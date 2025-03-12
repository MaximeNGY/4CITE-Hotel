const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

let adminToken = '';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Hotel.deleteMany();

    // Créer un admin et récupérer son token
    const res = await request(app)
        .post('/api/auth/register')
        .send({ email: "admin@email.com", pseudo: "adminUser", password: "password123" });

    const login = await request(app)
        .post('/api/auth/login')
        .send({ email: "admin@email.com", password: "password123" });

    adminToken = login.body.token;
});

afterAll(async () => {
    await mongoose.disconnect();
});

test("Création d'un hôtel (admin)", async () => {
    const res = await request(app)
        .post('/api/hotels')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: "Hôtel Test", location: "Paris", description: "Un bel hôtel", picture_list: [] });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
});