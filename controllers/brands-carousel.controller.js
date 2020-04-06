'use strict';

const BrandsCarousel = require('../models/brands-carousel.model');

exports.index = async (req, res) => {
    const brandsCarousel = await BrandsCarousel.findById('brandsCarousel');
    res.send(brandsCarousel);
}

exports.update = async (req, res) => {
    const brandsCarousel = await BrandsCarousel.findById('brandsCarousel');

    if (brandsCarousel) {
        try {
            await brandsCarousel.updateOne(req.body)
            return res.send('Brands carousel successfully updated!');
        } catch(err) {
            res.json(err).status(403);
        }
    } else {
        try {
            const newBrandsCarousel = new BrandsCarousel(req.body);
            newBrandsCarousel.save();
            return res.send('Brands carousel successfully created!');
        } catch (err) {
            res.json(err).status(403);
        }
    }
}