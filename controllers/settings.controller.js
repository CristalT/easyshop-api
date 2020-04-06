const Setting = require('../models/setting.model');

exports.update = async function(req, res) {
    const settings = await Setting.findById('settings');

    if (settings) {
        await settings.updateOne(req.body)
            .then(() => {
                res.send({
                    message: 'Settings updated!',
                    settings: settings
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        const setting = new Setting(req.body);
        setting.save().then(() => {
            res.send({
                message: 'Settings saved!',
                settings: setting
            });
        });
    }
};

exports.index = async function(req, res) {
    const settings = await Setting.find({ _id: 'settings' });
    res.send(settings);
};
