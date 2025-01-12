const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Créer la table "users"
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });

        const hashedPassword = await bcrypt.hash('toto', 10);
        await queryInterface.bulkInsert('users', [{
            username: 'emma',
            password: hashedPassword
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};