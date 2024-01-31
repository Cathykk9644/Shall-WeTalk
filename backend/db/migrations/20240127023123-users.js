'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: sequelize.STRING,
      },
      planType: {
        allowNull: false,
        type: sequelize.STRING,
      },
      bio: {
        allowNull: false,
        type: sequelize.STRING,
      },
      imageURL: {
        allowNull: false,
        type: sequelize.STRING,
      },
      userAddress: {
        allowNull: false,
        type: sequelize.STRING,
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
    await queryInterface.dropTable('users');
  },
};
