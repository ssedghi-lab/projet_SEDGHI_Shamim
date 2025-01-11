// routes/product.routes.js
const { checkJwt } = require('./authMiddleware.js');
const productController = require('../controllers/product.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    // Route protégée pour obtenir les produits
    router.get("/", checkJwt, productController.get);

    // Route protégée pour ajouter un produit
    router.post("/add", checkJwt, productController.add);

    app.use('/api/products', router);
};