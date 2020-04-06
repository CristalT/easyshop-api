'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactData = new Schema({
    _id:{ type: String, required: true },
    items: [
        {
            title: { type: String, required: true },
            label: { type: String, required: true},
            link: String,
            icon: String
        }
    ]
});

module.exports = mongoose.model('ContactData', ContactData);
