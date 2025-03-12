const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, pseudo, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔐 Mot de passe hashé avant insertion :", hashedPassword);

    user = new User({ email, pseudo, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Email reçu :", email);
    console.log("🔑 Mot de passe reçu :", password);

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ Utilisateur introuvable !");
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // Comparer le mot de passe hashé
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 bcrypt.compare() retourne :", isMatch);

    if (!isMatch) {
      console.log("❌ Mauvais mot de passe !");
      return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("🎟️ Token généré :", token);
    res.json({ token });
  } catch (err) {
    console.error("❌ Erreur serveur :", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
