const express = require('express');
const Hotel = require('../models/Hotel');
const authMiddleware = require('../middlewares/auth.middleware'); // Vérifie si l'utilisateur est connecté
const adminMiddleware = require('../middlewares/adminMiddleware'); // Vérifie si c'est un admin
const router = express.Router();

// GET : Liste des hôtels avec filtre et pagination
router.get('/', async (req, res) => {
    try {
        const { limit = 10, sortBy = 'name' } = req.query;
        const hotels = await Hotel.find().sort(sortBy).limit(parseInt(limit));
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST : Ajouter un hôtel (Admin uniquement)
router.post('/', adminMiddleware, async (req, res) => {
    try {
        const { name, location, description, picture_list } = req.body;
        const newHotel = new Hotel({ name, location, description, picture_list });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT : Modifier un hôtel (Admin uniquement)
router.put('/:id', adminMiddleware, async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) return res.status(404).json({ message: 'Hôtel non trouvé' });
        res.json(updatedHotel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE : Supprimer un hôtel (Admin uniquement)
router.delete('/:id', adminMiddleware, async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) return res.status(404).json({ message: 'Hôtel non trouvé' });
        res.json({ message: 'Hôtel supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;