'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('sessions', {
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
      sessionId: {
        allowNull: false,
        type: sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: sequelize.JSON,
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
    await queryInterface.dropTable('sessions');
  },
};
