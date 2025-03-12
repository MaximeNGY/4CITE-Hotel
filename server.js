// const { swaggerUi, swaggerDocs } = require('./src/swagger');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const hotelRoutes = require('./src/routes/hotel.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

//Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connecté'))
.catch(err => console.error('❌ Erreur de connexion MongoDB :', err));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});

// Routes API
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




