module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [{
                ref: '1234',
                libelle: 'productA',
                prix: 10.0,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                ref: '5678',
                libelle: 'productB',
                prix: 20.0,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                ref: '7890',
                libelle: 'productC',
                prix: 30.0,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', { ref: ['1234', '5678', '7890'] }, {});
    }
};