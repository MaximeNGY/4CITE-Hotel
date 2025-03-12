const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
