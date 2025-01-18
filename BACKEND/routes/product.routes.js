// routes/product.routes.js
const { checkJwt } = require('./authMiddleware.js');
const productController = require('../controllers/product.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    // Route publique pour récupérer tous les produits
    router.get('/', productController.getAllProducts);

    // Route publique pour ajouter un produit (vous pouvez la protéger si besoin)
    router.post('/add', productController.add);

    // Si vous avez besoin d’une route protégée :
    // router.get('/secret', checkJwt, productController.get);

    // On associe le tout à /api/products
    app.use('/api/products', router);
};