const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('toto', 10);
        return queryInterface.bulkInsert('users', [{
            username: 'emma',
            password: hashedPassword
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', { username: 'emma' }, {});
    }
};