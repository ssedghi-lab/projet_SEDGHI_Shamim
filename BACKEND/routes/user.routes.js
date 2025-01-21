// routes/user.routes.js
const { checkJwt } = require('./authMiddleware.js');
const userController = require('../controllers/user.controllers.js');

module.exports = app => {
    const router = require("express").Router();

    router.post("/login", userController.login);

    router.post("/register", userController.addUser);

    app.use('/api/user', router);
};