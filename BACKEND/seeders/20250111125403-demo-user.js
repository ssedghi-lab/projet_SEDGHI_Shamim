const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('toto', 10);
        return queryInterface.bulkInsert('users', [{
            username: 'emma',
            password: hashedPassword,
            mail: 'emma@example.com',
            nom: 'BOVARY',
            prenom: 'Emma',
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', { username: 'emma' }, {});
    }
}