'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('federatedCredentials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      provider: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      providerId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      accessToken: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      refreshToken: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('federatedCredentials');
  },
};
