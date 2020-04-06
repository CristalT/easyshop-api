const Product = require('../models/product.model');
const { mapResults } = require('../helpers');

/** Store a new product */
exports.store = function(req, res) {
    const product = new Product(req.body);

    product.save(err => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send({
                message: 'Product successfully saved!',
                product: product
            });
        }
    });
};

exports.update = function(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            product.update(req.body, err => {
                if (err) {
                    return res.status(403).send(err);
                } else {
                    return res.status(200).send({
                        message: 'Product successfully updated!',
                        product: product
                    });
                }
            });
        }
    });
};

/** Retrieve products (all or by category) */
exports.index = async function(req, res) {
    const category = req.params.category;

    let mapped = {};

    if (!category) {
        /** Retrieve all products */
        const products = await Product.find({ public: true });
        mapped = mapResults(products);
    } else {
        /** Retrieve products by category */
        await Product.find({ category: category }, (err, products) => {
            if (err) {
                return res.status(500).send(err);
            }
            mapped = mapResults(products);
        });
    }

    res.send(mapped);
};

exports.indexAdmin = async function(req, res) {
    try {
        const products = await Product.find({});
        const mapped = mapResults(products);
        res.send(mapped);
    } catch (e) {
        res.status(409).send(e)
    }
}

/** Retrieve product data by ID */
exports.open = function(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(product);
        }
    });
};

/** Delete product by ID */
exports.destroy = async function(req, res) {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    try {
        await product.remove();
        res.send('Product successfully deleted!');
    } catch (err) {
        console.log(err);
        res.status(409).send('Error while deleting product');
    }
};
