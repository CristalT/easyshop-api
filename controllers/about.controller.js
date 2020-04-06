const About = require('../models/about.model');

exports.update = async function(req, res) {
    const about = await About.findById('about');

    if (about) {
        await about.updateOne(req.body)
            .then(() => {
                res.send({
                    message: 'About us, updated!',
                    about: about
                });
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        const about = new About(req.body);
        await about.save().then(() => {
            res.send({
                message: 'About us saved!',
                about: about
            });
        });
    }
};

exports.index = async function(req, res) {
    const about = await About.find({ _id: 'about' });
    res.send(about);
};
