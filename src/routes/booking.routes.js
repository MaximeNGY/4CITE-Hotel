const express = require('express');
const Booking = require('../models/Booking');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// 📌 GET : Voir mes réservations
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 POST : Réserver un hôtel
router.post('/', authMiddleware, async (req, res) => {
  try {
      const { hotel, check_in, check_out } = req.body;

      // ✅ Vérifier si l'hôtel existe
      const existingHotel = await Hotel.findById(hotel);
      if (!existingHotel) {
          return res.status(400).json({ message: "Hôtel non trouvé" });
      }

      const newBooking = new Booking({ user: req.user.id, hotel, check_in, check_out });
      await newBooking.save();

      res.status(201).json(newBooking);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// 📌 DELETE : Annuler une réservation
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
        if (!booking) return res.status(404).json({ message: 'Réservation non trouvée' });
        
        await booking.deleteOne();
        res.json({ message: 'Réservation annulée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;