const Category = require('../models/category.model');
const Product = require('../models/product.model');
const { mapResults } = require('../helpers')

/** Store a new Category */
exports.store = function(req, res) {
    const category = new Category(req.body);

    category.save(err => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send({
                message: 'Category successfully created!',
                category: category
            });
        }
    });
};

/** Update category */
exports.update = async function(req, res) {
    const category = Category.findById(req.params.id);

    if (category) {
        await category
            .updateOne({}, req.body)
            .then(() => {
                res.status(200).send('Category successfully updated!');
            })
            .catch(err => {
                console.log(err);
                res.status(409).send('Error');
            });
    } else {
        res.status(404).send('Category not found!');
    }
};

/** Show all categories */
exports.index = function(req, res) {
    Category.find({}, (err, categories) => {
        if (err) {
            return res.status(500).send(err);
        }

        const categoryMap = {};

        categories.forEach(category => {
            categoryMap[category._id] = category;
        });

        res.send(categoryMap);
    });
};

/** Get count of items per category */
exports.indexActiveCategories = async function(req, res) {
    const query = await Category.find({});
    const categories = mapResults(query);

    const promises = [];

    Object.values(categories).forEach(category => {
        promises.push(
            Product.count({ category: category.name })
        );
    })

    Promise.all(promises).then(results => {
        const values = results.map((quantity, index) => ({
            category: Object.values(categories)[index]['name'],
            productsCount: quantity
        }))
        res.send(values)
    })
};

/** Delete category by id */
exports.destroy = function(req, res) {
    const category = Category.findById(req.params.id);

    if (!category) {
        res.status(400).send('Category not found!');
    } else {
        category.remove().then(() => {
            res.send('Category deleted!');
        });
    }
};
