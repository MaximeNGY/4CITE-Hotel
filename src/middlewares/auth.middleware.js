const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("🔍 Token reçu dans le middleware :", token); // 🔴 Ajout

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Utilisateur authentifié dans le middleware :", req.user); // 🔴 Ajout
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
