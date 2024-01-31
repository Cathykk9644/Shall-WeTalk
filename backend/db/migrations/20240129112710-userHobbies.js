'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('userHobbies', {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: sequelize.INTEGER,
      },

      userId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'users',

          key: 'id',
        },
      },

      hobbyId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'hobbies',

          key: 'id',
        },
      },

      createdAt: {
        allowNull: false,

        type: sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,

        type: sequelize.DATE,
      },
    });
  },

  async down(queryInterface, sequelize) {
    await queryInterface.dropTable('userHobbies');
  },
};
