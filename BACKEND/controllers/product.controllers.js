const db = require('../models');
const { Op } = require('sequelize');

exports.getAllProducts = async(req, res) => {
    try {
        const products = await db.Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
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

exports.search = (req, res) => {
    const query = req.query.query;

    console.log('search', query)

    if (!query || typeof query !== 'string') {
        return res.status(400).json({
            message: 'Invalid search query provided.'
        });
    }
    db.Product.findAll({
            where: {
                libelle: {
                    [Op.iLike]: `%${query}%`
                }
            },
            attributes: ['id', 'ref', 'libelle', 'prix']
        })
        .then(data => {
            if (data.length > 0) {
                console.log(data);
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: 'No products found matching the query.'
                });
            }
        })
        .catch(err => {
            console.error("Error searching products:", err);
            res.status(500).json({
                message: err.message || "An error occurred while searching for products."
            });
        });
}