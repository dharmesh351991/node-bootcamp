const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A tour must have title!'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price!'],
    },
    description: { type: String },
    brand: { type: String },
    thumbnail: { type: String }
});
const Tour = new mongoose.model('tours', tourSchema);

module.exports = Tour;