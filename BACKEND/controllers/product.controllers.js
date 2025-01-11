const db = require('../models');

exports.get = async(req, res) => {
    console.log('Requête reçue pour obtenir les produits:', req.user);
    try {
        const products = await db.Product.findAll();
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

exports.add = async(req, res) => {
    const { ref, libelle, prix } = req.body;

    if (!ref || !libelle || prix == null) {
        return res.status(400).json({ error: "Réf, libellé et prix sont requis" });
    }

    try {
        const newProduct = await db.Product.create({ ref, libelle, prix });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};