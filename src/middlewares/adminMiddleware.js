const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Accès refusé, admin requis." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide." });
    }
};
