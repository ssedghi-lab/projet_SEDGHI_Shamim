// routes/product.routes.js
const { checkJwt } = require('./authMiddleware.js');
const productController = require('../controllers/product.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    router.get('/', productController.getAllProducts);
    router.post('/add', productController.add);
    router.get('/search', productController.search);

    app.use('/api/products', router);
};