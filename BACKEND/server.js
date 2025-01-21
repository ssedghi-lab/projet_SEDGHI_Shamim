// /BACKEND/server.js

require('dotenv').config()
'use strict';

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Chargement des routes API
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);

// Route de base
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(express.static(path.join(__dirname, 'FRONTEND/dist/my-angular-app')));


const port = process.env.PORT || 443;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});