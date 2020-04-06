const express = require('express');
const authMdw = require('../middleware/auth.middleware')
const router = express.Router();

const { ...controller } = require('./controllers')

/** User Routes */
router.put('/user/create', controller.users.create); // Delete this on finish
router.post('/user/login', controller.users.login);
router.get('/user/state', authMdw.ensureAuthenticated, controller.users.authState);

/** Home Carousel Routes */
router.get('/home-carousel/slides', controller.homeCarousel.index);
router.put('/home-carousel/slide', authMdw.ensureAuthenticated, controller.homeCarousel.store);
router.get('/home-carousel/slide/:id', authMdw.ensureAuthenticated, controller.homeCarousel.open);
router.post('/home-carousel/slide/:id', authMdw.ensureAuthenticated, controller.homeCarousel.update);
router.delete('/home-carousel/slide/:id', authMdw.ensureAuthenticated, controller.homeCarousel.destroy);

/** Category Routes */
router.get('/active-categories', controller.category.indexActiveCategories);
router.get('/category', controller.category.index);
router.put('/category', authMdw.ensureAuthenticated, controller.category.store);
router.post('/category/:id', authMdw.ensureAuthenticated, controller.category.update);
router.delete('/category/:id', authMdw.ensureAuthenticated, controller.category.destroy);

/** Product Routes */
router.get('/products/:category?', controller.products.index);
router.get('/product/:id', controller.products.open);
router.put('/product', authMdw.ensureAuthenticated, controller.products.store);
router.get('/products-admin', authMdw.ensureAuthenticated, controller.products.indexAdmin);
router.post('/product/:id', authMdw.ensureAuthenticated, controller.products.update);
router.delete('/product/:id', authMdw.ensureAuthenticated, controller.products.destroy);

/** Upload Routes */
router.post('/upload', controller.uploads.upload);

/** About Us Routes */
router.get('/about', controller.about.index);
router.post('/about', authMdw.ensureAuthenticated, controller.about.update);

/** Setting Routes */
router.get('/settings', controller.settings.index);
router.post('/settings', authMdw.ensureAuthenticated, controller.settings.update);

/** Order Routes */
router.put('/order', controller.order.create);
router.get('/orders', authMdw.ensureAuthenticated, controller.order.index);
router.get('/order/:id', authMdw.ensureAuthenticated, controller.order.open);

/** MercadoPago Routes */
router.post('/mercadopago/notifications', controller.mercadopago.notification);

/** Mailing Routes */
router.post('/mailing/contact-form', controller.mailing.contactForm);

/** Contact Data Routes */
router.get('/contact-data', controller.contact.index);
router.post('/contact-data', authMdw.ensureAuthenticated, controller.contact.update);

/** Brands Carousel */
router.get('/brands-carousel', controller.brands.index);
router.post('/brands-carousel', controller.brands.update);

module.exports = router;
