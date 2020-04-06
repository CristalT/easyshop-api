const usersController = require('../controllers/users.controller');
const homeCarouselController = require('../controllers/home-carousel.controller');
const categoryController = require('../controllers/categories.controller');
const productsController = require('../controllers/products.controller');
const uploadsController = require('../controllers/uploads.controller');
const settingsController = require('../controllers/settings.controller');
const orderController = require('../controllers/orders.controller');
const mercadopagoController = require('../controllers/mercadopago.controller');
const aboutController = require('../controllers/about.controller');
const mailingController = require('../controllers/mailing.controller');
const contactDataController = require('../controllers/contact-data.controller');
const brandsCarouselController = require('../controllers/brands-carousel.controller');

module.exports = {
    users: usersController,
    homeCarousel: homeCarouselController,
    category: categoryController,
    products: productsController,
    uploads: uploadsController,
    settings: settingsController,
    order: orderController,
    mercadopago: mercadopagoController,
    about: aboutController,
    mailing: mailingController,
    contact: contactDataController,
    brands: brandsCarouselController
}