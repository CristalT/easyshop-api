const Slide = require('../models/home-carousel-slide.model');
const { mapResults } = require('../helpers');

exports.store = async function(req, res) {
    const slide = new Slide(req.body);

    await slide
        .save()
        .then(() => {
            res.send('Slide succesfully created!');
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error on creating slide.');
        });
};

exports.update = async function(req, res) {
    const id = req.param.id;
    try {
        await Slide.updateOne({ _id: id }, req.body);
        res.send('Slide successfully updated!');
    } catch (e) {
        res.status(400).send('Error on update.');
    }
};

exports.index = async function(req, res) {
    const slides = await Slide.find({});
    const mapped = mapResults(slides);
    res.send(mapped);
};

exports.destroy = async function(req, res) {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
        return res.status(404).send('Slide not found');
    }

    try {
        await slide.remove();
        res.send('Slide successfully deleted!');
    } catch (err) {
        console.log(err);
        res.status(409).send('Error while deleting slide');
    }
};


exports.open = function(req, res) {
    Slide.findById(req.params.id, (err, slide) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(slide);
        }
    });
};
