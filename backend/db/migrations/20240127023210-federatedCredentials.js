'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('federatedCredentials', {
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
      provider: {
        allowNull: false,
        type: sequelize.STRING,
      },
      providerId: {
        allowNull: false,
        type: sequelize.STRING,
      },
      accessToken: {
        allowNull: false,
        type: sequelize.STRING,
      },
      refreshToken: {
        allowNull: false,
        type: sequelize.STRING,
      },
      expires: {
        allowNull: false,
        type: sequelize.DATE,
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
    await queryInterface.dropTable('federatedCredentials');
  },
};
