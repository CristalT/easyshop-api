const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slide = new Schema({
    image: { type: String, required: true },
    title: String,
    text: String
});

module.exports = mongoose.model('Slide', Slide);
