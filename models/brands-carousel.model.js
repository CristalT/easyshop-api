const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandsCarousel = new Schema({
    _id: { type: String, required: true },
    slides: [
        {
            filename: String
        }
    ]
})

module.exports = mongoose.model('BrandsCarousel', BrandsCarousel);