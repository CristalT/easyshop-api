const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const About = new Schema({
    _id: { type: String, required: true },
    text: String
});

module.exports = mongoose.model('About', About)