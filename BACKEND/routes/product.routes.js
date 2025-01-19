// routes/product.routes.js
const { checkJwt } = require('./authMiddleware.js');
const productController = require('../controllers/product.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    // Route publique pour récupérer tous les produits
    router.get('/products', productController.getAllProducts);
    // Route publique pour ajouter un produit 
    router.post('/add', productController.add);


    app.use('/api/products', router);
};