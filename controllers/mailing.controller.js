'use strict';
const mailjet = require('node-mailjet');
const Setting = require('../models/setting.model');

exports.contactForm = async (req, res, next) => {
    const settings = await Setting.findById('settings');

    let mjet;
    try {
        mjet = mailjet.connect(
            settings.mailing.mailjet.publicKey,
            settings.mailing.mailjet.privateKey
        );
    } catch (err) {
        next(err);
    }

    const message = {
        From: {
            Email: req.body.from.email,
            Name: req.body.from.name
        },
        To: [
            {
                Email: settings.mailing.from.email,
                Name: settings.mailing.from.name
            }
        ],
        Subject: 'Mensaje enviado desde sitio web',
        TextPart: req.body.message
    };

    const request = mjet.post('send', { version: 'v3.1' }).request({
        Messages: [message]
    });

    request
        .then(result => {
            res.json(result.body);
        })
        .catch(err => {
            res.status(403).json(err);
        });
};
