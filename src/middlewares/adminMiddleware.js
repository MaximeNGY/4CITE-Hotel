const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("🔍 Token décodé :", decoded);

        if (decoded.role !== 'admin') {
            console.log("⛔ Accès refusé - Rôle de l'utilisateur :", decoded.role);
            return res.status(403).json({ message: "Accès refusé, admin requis." });
        }
        req.user = decoded;
        console.log("✅ Utilisateur autorisé :", req.user);


        next();
    } catch (err) {
        console.log("❌ Erreur de token :", err.message);
        res.status(401).json({ message: "Token invalide." });
    }
};
