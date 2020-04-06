const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    date: { type: Number, required: true },
    payer: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        document: { type: Number, required: true },
        email: { type: String },
        phone: {
            areaCode: { type: Number, required: true },
            number: { type: Number, required: true }
        },
        address: {
            streetName: { type: String, required: true },
            streetNumber: { type: Number, required: true },
            apartment: String,
            zipCode: String,
            city: String
        }
    },
    products: [
        {
            name: { type: String, required: true },
            code: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    payment: {
        method: { type: String, required: true },
        status: String,
        statusDetail: String
    },
    shipment: {
        status: String
    }
});

module.exports = mongoose.model('Order', Order);
