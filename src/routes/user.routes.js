const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Lire son propre profil
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lire un utilisateur (admin uniquement)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Accès refusé" });

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour un utilisateur (soi-même ou admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const { email, pseudo } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { email, pseudo }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer son compte (ou admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
