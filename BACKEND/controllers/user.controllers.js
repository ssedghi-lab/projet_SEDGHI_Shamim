// controllers/user.controllers.js
const db = require('../models');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

// Fonction pour générer le token JWT
function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}

exports.login = async(req, res) => {
    const { username, password } = req.body;

    // Vérification des champs requis
    if (!username || !password) {
        return res.status(400).json({ error: "Username et mot de passe requis" });
    }

    try {
        const user = await db.User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: "Identifiants invalides" });
        }

        // Comparer les mots de passe
        const match = await user.validPassword(password);
        if (!match) {
            return res.status(401).json({ error: "Identifiants invalides" });
        }

        // Création du token d'accès
        const userPayload = {
            id: user.id, // L'ID généré automatiquement
            username: user.username,
        };

        const accessToken = generateAccessToken(userPayload);

        // Réponse au client avec le token
        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.status(200).json({ user: userPayload, token: accessToken });
    } catch (error) {
        console.error('Erreur lors du login:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
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
            mail,
            nom,
            prenom
        });

        console.log('New User Added:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un utilisateur:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

exports.updateUser = async(req, res) => {
    const { username, password, mail, nom, prenom, id } = req.body;

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