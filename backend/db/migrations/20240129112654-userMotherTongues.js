'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('userMotherTongues', {
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

      languageId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'languages',

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
    await queryInterface.dropTable('userMotherTongues');
  },
};
