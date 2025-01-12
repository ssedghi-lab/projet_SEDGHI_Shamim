module.exports = {
    up: async(queryInterface, Sequelize) => {
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

        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('gen_random_uuid()'),
                primaryKey: true,
                allowNull: false
            },
            ref: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            libelle: {
                type: Sequelize.STRING,
                allowNull: false
            },
            prix: {
                type: Sequelize.FLOAT,
                allowNull: false
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
        await queryInterface.dropTable('users');
    }
};