const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A product must have title!'],
        unique : true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A product must have price!'],
    },
    description : {type: String},
    brand : {type:String},
    thumbnail : {type: String}
});
const Prdocuct = new mongoose.model('Products', productSchema);

module.exports = Prdocuct;