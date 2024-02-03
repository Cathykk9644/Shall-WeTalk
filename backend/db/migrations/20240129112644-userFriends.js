'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('userFriends', {
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
      friendId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      friendNickname: {
        allowNull: true,
        type: sequelize.STRING,
      },
      isAccepted: {
        allowNull: false,
        type: sequelize.BOOLEAN,
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
    await queryInterface.dropTable('userFriends');
  },
};
