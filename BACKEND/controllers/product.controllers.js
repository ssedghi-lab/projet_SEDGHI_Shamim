const db = require('../models');

exports.getAllProducts = async(req, res) => {
    try {
        const products = await db.Product.findAll(); // On interroge la table "products"
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

exports.get = async(req, res) => {
    try {
        // req.params.id -> identifiant du produit
        const product = await db.Product.findOne({ where: { id: req.params.id } });
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.add = async(req, res) => {
    const { ref, libelle, prix } = req.body;
    if (!ref || !libelle || prix == null) {
        return res.status(400).json({ error: 'Réf, libellé et prix sont requis' });
    }

    try {
        const newProduct = await db.Product.create({ ref, libelle, prix });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};