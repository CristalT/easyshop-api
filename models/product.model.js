const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, index: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    images: [String],
    defaultImage: String,
    public: { type: Boolean },
    priceVisible: { type: Boolean }
});

module.exports = mongoose.model('Product', Product);
