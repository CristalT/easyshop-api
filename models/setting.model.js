const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Setting = new Schema({
    _id: { type: String, required: true },
    catalogOn: Boolean,
    salesOn: Boolean,
    paymentMethods: [{
        label: String,
        value: Boolean
    }],
    mercadoPagoCredentials: {
        publicKey: String,
        accessToken: String
    },
    mailing: {
        mailjet: {
            publicKey: String,
            privateKey: String
        },
        from: {
            name: String,
            email: String
        }
    },
    contactForm: {
        enabled: Boolean,
        emailTo: { type: String, validate: [
            function validator(val) {
                return this.enabled && val === ''
            }, '{PATH} is required'
        ]}
    }
});

module.exports = mongoose.model('Setting', Setting);
