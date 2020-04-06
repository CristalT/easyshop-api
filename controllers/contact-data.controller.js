const ContactData = require('../models/contact.model');
const { mapResults } = require('../helpers');

exports.index = async (req, res) => {
    const contactData = await ContactData.findById('contactData');
    res.json(contactData.items);
};

exports.update = async (req, res) => {
    const contactData = await ContactData.findById('contactData');

    try {
        if (contactData) {
            // update
            contactData.items = req.body.items;
            contactData.save();
            res.send('Data successfully updated!');
        } else {
            // create
            const newContactData = new ContactData(req.body);
            newContactData.save();
            res.send('Data successfully created!');
        }
    } catch (err) {
        res.status(403).json(err);
    }
};
