// /BACKEND/server.js

'use strict';

require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const db = require('./models');

// Configuration des options CORS
const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: 'Authorization'
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
})

// Chargement des routes API
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(express.static(path.join(__dirname, 'FRONTEND/dist/my-angular-app')));

// Route catch-all pour Angular (redirection vers index.html)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'FRONTEND/dist/my-angular-app/index.html'));
});

db.sequelize.sync({ force: false }) // Mettre `force: true` pour recréer les tables à chaque démarrage
    .then(() => {
        const port = process.env.SERVER_PORT || 3000;
        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });