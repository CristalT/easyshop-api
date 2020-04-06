const mercadopago = require('mercadopago');
const Order = require('../models/order.model');
const Setting = require('../models/setting.model');

exports.notification = async function(req, res, next) {
    const params = req.query;

    if (params.type && params.type === 'payment') {
        const settings = await Setting.findById('settings');

        if (!settings.mercadoPagoCredentials.accessToken) {
            next('MercadoPago Access Token not found.');
        } else {
            mercadopago.configure({
                access_token: settings.mercadoPagoCredentials.accessToken
            });
            const { body } = await mercadopago.payment.get(params['data.id']);
            const { external_reference, status, status_detail } = body;
            Order.updateOne(
                { _id: external_reference },
                {
                    payment: {
                        status: status,
                        statusDetail: status_detail
                    }
                }
            );
            res.send('Ok!');
        }
    }

};
