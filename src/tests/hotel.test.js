const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let adminToken = '';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Hotel.deleteMany();

    // Création d'un utilisateur admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
        pseudo: "TestAdminUser",
        email: "admin@email.com",
        password: hashedPassword,
        role: "admin"
    });
    await adminUser.save();

    // Génération du token admin
    adminToken = jwt.sign(
        { id: adminUser._id.toString(), role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );})

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

module.exports = { adminToken };