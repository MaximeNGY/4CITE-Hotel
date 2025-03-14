const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Booking API', () => {
  let authToken;
  let adminToken;
  let hotelId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Nettoyage de la base de données
    await User.deleteMany();
    await Booking.deleteMany();

    // Création utilisateur admin
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
      { id: adminUser._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
  );

    // Création du user via l'API
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com', pseudo: 'user123', password: 'password' });
    expect(registerRes.statusCode).toBe(201);


    // Login et récupération du token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password' });
    expect(loginRes.statusCode).toBe(200);
    authToken = loginRes.body.token;

    console.log("🔑 Token reçu :", authToken);

    // Création de l'hôtel via l'API (pour tester les droits de l'utilisateur)
    const hotelRes = await request(app)
      .post('/api/hotels')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: "Hotel Test", location: "Paris", description: "Un hôtel de test", picture_list: [] });
    expect(hotelRes.statusCode).toBe(201);
    hotelId = hotelRes.body._id;

    // Création du booking de test
    const bookingData = {
      hotel: hotelId, // Utiliser l'ID de l'hôtel créé
      check_in: '2025-05-01',
      check_out: '2025-05-05'
    };
  
    const booking = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send(bookingData);
  
    expect(booking.statusCode).toBe(201);
  });

  test('Créer une réservation', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({hotel: hotelId, check_in: "2025-05-01", check_out: "2025-05-05"});
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  test('Récupérer ses réservations', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

});

