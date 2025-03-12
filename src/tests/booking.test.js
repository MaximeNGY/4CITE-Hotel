const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

describe('Booking API', () => {
  let authToken; // Nom plus explicite
  let hotelId;

  beforeAll(async () => {
    // Nettoyage de la base de données
    await User.deleteMany();
    await Hotel.deleteMany();
    await Booking.deleteMany();

    // Création du user via l'API
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com', pseudo: 'user123', password: 'password' });
    expect(registerRes.statusCode).toBe(201); // Vérification ajoutée

    // Login et récupération du token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password' });
    expect(loginRes.statusCode).toBe(200); // Vérification ajoutée
    authToken = loginRes.body.token;

    // Création de l'hôtel via l'API (pour tester les droits de l'utilisateur)
    const hotelRes = await request(app)
      .post('/api/hotels')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: "Hotel Test", location: "Paris", description: "Un hôtel de test", picture_list: [] });
    expect(hotelRes.statusCode).toBe(201); // Vérification ajoutée
    hotelId = hotelRes.body._id;
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Gestion ajoutée de la déconnexion
  });

  test('Créer une réservation', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ hotel: hotelId, checkIn: "2025-05-01", checkOut: "2025-05-05", guests: 2 });
    
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
});