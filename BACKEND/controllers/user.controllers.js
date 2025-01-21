// controllers/user.controllers.js
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = db.User;
const secretKey = process.env.ACCESS_TOKEN_SECRET;


exports.login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


exports.addUser = async(req, res) => {
    const { username, password, mail, nom, prenom } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username et mot de passe requis' });
    }

    try {
        // L'Hook `beforeCreate` de Sequelize hachera automatiquement le mot de passe
        const newUser = await db.User.create({
            username,
            password,

        });

        console.log('New User Added:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un utilisateur:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};