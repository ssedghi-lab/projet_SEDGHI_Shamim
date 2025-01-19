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

exports.updateUser = async(req, res) => {
    const { username, password, id } = req.body;

    const pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(username) && pattern.test(password)) {
        try {
            const user = await db.User.findOne({ where: { id, username } });
            if (user) {
                // L'Hook `beforeUpdate` de Sequelize hachera automatiquement le mot de passe
                await user.update({
                    password,
                    mail,
                    nom,
                    prenom
                });

                res.status(200).json({ message: "Utilisateur mis à jour" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    } else {
        res.status(400).json({ message: "Validation échouée" });
    }
};

exports.getUser = async(req, res) => {
    const userId = req.query.id;
    try {
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};