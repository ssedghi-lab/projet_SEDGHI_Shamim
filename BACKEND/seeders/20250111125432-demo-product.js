module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [{
            id: Sequelize.literal('gen_random_uuid()'),
            ref: '1234',
            libelle: 'productA',
            prix: 10.0,
        }, {
            id: Sequelize.literal('gen_random_uuid()'),
            ref: '5678',
            libelle: 'productB',
            prix: 20.0,
        }, {
            id: Sequelize.literal('gen_random_uuid()'),
            ref: '7890',
            libelle: 'productC',
            prix: 30.0,
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
};