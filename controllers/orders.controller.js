const Order = require('../models/order.model');
const Setting = require('../models/setting.model');
const mercadopago = require('mercadopago');
const { mapResults, mpPreferenceParser } = require('../helpers');

exports.create = async function(req, res, next) {
    const { publicKey, ...data } = req.body;

    data.date = new Date().getTime();
    data.shipment = {
        status: 'PENDING'
    };

    const order = new Order(data);

    try {
        await order.save();

        if (order.payment.method === 'MercadoPago') {

            const settings = await Setting.findById('settings');

            if (!settings.mercadoPagoCredentials.access_token) {
                
                next('No mercadopago access_token found');

            } else {

                mercadopago.configure({
                    access_token: settings.mercadoPagoCredentials.accessToken
                });
                
            }

            const preference = mpPreferenceParser(data, order._id.toString());

            await mercadopago.preferences
                .create(preference)
                .then(data => {
                    return res.send(data.body.init_point);
                })
                .catch(err => {
                    console.log(err);
                    res.status(409).send(err);
                });
        } else {
            res.send('/order/successfully-sended');
        }
    } catch (err) {
        console.log(err);
        res.status(409).send('Error while creating order');
    }
};

exports.index = async function(req, res) {
    const orders = await Order.find({});
    const results = mapResults(orders);
    res.send(results);
};

exports.open = async function(req, res) {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(400).send('Order not found!');
    } else {
        res.send(order);
    }
};
