# 🏨 Akkor Hotel Booking API - Backend

[![CI/CD Pipeline](https://github.com/MaximeNGY/4CITE-Hotel/actions/workflows/ci.yml/badge.svg)](https://github.com/MaximeNGY/4CITE-Hotel/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Swagger Documentation](https://img.shields.io/badge/Docs-Swagger-%2385EA2D)](http://localhost:5000/api-docs)

API backend pour le système de réservation d'hôtels Akkor Hotel, développé avec Node.js, Express et MongoDB.

## 📋 Fonctionnalités

- **Gestion utilisateurs** (CRUD sécurisé)
- **Authentification JWT** avec rôles (user/admin)
- **Gestion des hôtels** (CRUD réservé aux admins)
- **Système de réservation** personnalisé
- **Validation des données** avec Joi
- **Documentation API complète** (Swagger/OpenAPI)
- **Suite de tests complète** (unitaires, intégration, e2e)

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- MongoDB 6+
- NPM 9+

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/MaximeNGY/4CITE-Hotel.git
cd hotel-booking-backend

# Installer les dépendances
npm install

# Configurer l'environnement (créer un fichier .env)
cp .env.example .env
```

### Configuration (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/akkor-hotel
JWT_SECRET=votre_super_secret_jwt
JWT_EXPIRES_IN=7d
```

### Execution

```bash
# Mode développement (avec reload automatique)
npm run dev

# Mode production
npm start
```

## 📚 Documentation API

Accédez à la documentation Swagger UI après le démarrage du serveur :
http://localhost:5000/api-docs

Exemple de endpoints :

```http
POST /api/auth/login
GET /api/hotels
POST /api/bookings
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests unitaires uniquement
npm test:unit

# Tests d'intégration
npm test:integration

# Tests e2e
npm test:e2e

# Générer le rapport de couverture
npm run coverage
```

## 🔧 Stack technique

- Runtime: Node.js 18
- Framework: Express.js
- Base de données: MongoDB
- Authentification: JWT + Passport.js
- Validation: Joi
- Tests: Jest + Supertest
- Documentation: Swagger UI

- CI/CD: GitHub Actions

## 🛠️ Workflow CI/CD

Le pipeline GitHub Actions exécute :

- Tests unitaires et d'intégration
- Audit de sécurité (npm audit)
- Vérification de la qualité de code (ESLint)
- Build de vérification

## 🤝 Contribution

1. Forker le projet

2. Créer une branche (git checkout -b feature/ma-fonctionnalité)

3. Commiter les changements (git commit -m 'Ajout d'une super fonctionnalité')

4. Pusher vers la branche (git push origin feature/ma-fonctionnalité)

5. Ouvrir une Pull Request

## 📄 License

Distribué sous licence MIT. Voir LICENSE pour plus d'informations.

---
⚠️ Attention : Ce projet est une solution académique et ne doit pas être utilisé en production sans audit de sécurité supplémentaire.

