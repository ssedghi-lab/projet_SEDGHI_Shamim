// routes/user.routes.js
const { checkJwt } = require('./authMiddleware.js');
const userController = require('../controllers/user.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    // Route pour le login
    router.post("/login", userController.login);

    // Route pour ajouter un utilisateur
    router.post("/register", userController.addUser);

    // Route pour mettre à jour un utilisateur
    router.put("/update-user", checkJwt, userController.updateUser);

    // Route pour obtenir un utilisateur
    router.get("/get-user", checkJwt, userController.getUser);

    app.use('/api/user', router);
};